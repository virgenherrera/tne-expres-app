import { readFileSync } from 'fs';
import { join } from 'path';
import { expect, should } from 'chai';
import * as request from 'supertest';
import * as rimraf from 'rimraf';
import { ApplicationInterface } from '../../src';
import * as appConfigs from '../fixtures/customApp/src';
import { Exceptions } from '../../src/constant/Exceptions';
import { stringify } from 'querystring';

should();
describe('@tne/express-app Interface test', () => {
	afterEach((done) => {
		ApplicationInterface.destruct();

		rimraf(join(__dirname, '../fixtures/customApp/logs'), () => done());
	});

	describe('Express Application() ', () => {
		it('should include custom locals on app locals', (done) => {
			const { baseAppSettings } = appConfigs;

			try {
				ApplicationInterface.construct(baseAppSettings);

				const instance = ApplicationInterface.getInstance();
				expect(instance).to.have.property('appLocals');

				Object.keys(baseAppSettings.locals).forEach(local => {
					expect(instance.appLocals).to.have.property(local);
					expect(instance.appLocals[local]).to.be.equal(baseAppSettings.locals[local]);
				});

				done();
			} catch (E) {
				done(E);
			}
		});

		it('should create an express app that exposes a public path', (done) => {
			const { publicPathAppSettings } = appConfigs;
			ApplicationInterface.construct(publicPathAppSettings);

			const content = readFileSync(join(__dirname, '../fixtures/customApp/public/index.html')).toString();

			request(ApplicationInterface.getExpressApp())
				.get('/')
				.expect(200)
				.end((err, res) => {
					if (err) {
						return done(err);
					}

					expect(res).to.be.an('object');

					expect(res).to.have.property('status');
					expect(res).to.have.property('text');
					expect(res).to.have.property('type');
					expect(res).to.have.property('charset');

					expect(res.status).to.be.equal(200);
					expect(res.text).to.be.equal(content);
					expect(res.type).to.be.equal('text/html');
					expect(res.charset).to.be.equal('UTF-8');

					done();
				});
		});

		it('should throw when trying to create an express app that exposes an invalid public path', (done) => {
			const { publicPathAppSettings } = appConfigs;
			publicPathAppSettings.publicFolder = '/nonExistentFolder';

			try {
				expect(ApplicationInterface.construct.bind(this, publicPathAppSettings)).to.throw(new RegExp(Exceptions.expAppBadPublicFolder));

				done();
			} catch (E) {
				done(E);
			}
		});

		it('should create an express app that exposes a public path and a favicon', (done) => {
			const { faviconAppSettings } = appConfigs;
			ApplicationInterface.construct(faviconAppSettings);

			request(ApplicationInterface.getExpressApp())
				.get('/favicon.ico')
				.expect(200)
				.end((err, res) => {
					if (err) {
						return done(err);
					}

					expect(res).to.be.an('object');
					expect(res).to.have.property('status');
					expect(res).to.have.property('type');

					expect(res.status).to.be.equal(200);
					expect(res.type).to.be.equal('image/x-icon');

					done();
				});
		});

		it('should throw when trying to create an express app that exposes a public path and an invalid favicon path', (done) => {
			const { faviconAppSettings } = appConfigs;
			faviconAppSettings.faviconPath = '/nonExistentFolder/nonoExistenFaviconFile.ico';

			try {
				expect(ApplicationInterface.construct.bind(this, faviconAppSettings)).to.throw(new RegExp(Exceptions.expAppBadFaviconFile));

				done();
			} catch (E) {
				done(E);
			}
		});

		it('should create an express app that exposes rest endpoints', (done) => {
			const { routedApp } = appConfigs;
			ApplicationInterface.construct(routedApp);

			request(ApplicationInterface.getExpressApp())
				.get('/api/v1/some')
				.expect(200)
				.end((err, res) => {
					if (err) {
						return done(err);
					}

					expect(res).to.be.an('object');

					expect(res).to.have.property('status');
					expect(res).to.have.property('type');

					expect(res.status).to.be.equal(200);
					expect(res.type).to.be.equal('application/json');

					done();
				});
		});

		it('should throw when tying to create an express app with a bad routesFolder argument', (done) => {
			const { routedAppBadRoutesFolder } = appConfigs;

			try {
				expect(ApplicationInterface.construct.bind(this, routedAppBadRoutesFolder)).to.throw();

				done();
			} catch (E) {
				done(E);
			}
		});

		it('should create an express app that exposes rest endpoints placed on several folders', (done) => {
			const { manyRoutesFolderApp } = appConfigs;
			ApplicationInterface.construct(manyRoutesFolderApp);

			request(ApplicationInterface.getExpressApp())
				.get('/api/v1/some')
				.expect(200)
				.end((err, res) => {
					if (err) {
						return done(err);
					}

					expect(res).to.be.an('object');

					expect(res).to.have.property('status');
					expect(res).to.have.property('type');

					expect(res.status).to.be.equal(200);
					expect(res.type).to.be.equal('application/json');

					done();
				});
		});

		it('should express app.logsPath prop must to match to config', () => {
			const { baseAppSettings } = appConfigs;
			const { logsPath, getConfig } = ApplicationInterface.construct(baseAppSettings);

			expect(logsPath).to.be.equal(getConfig('logsPath'));
		});

		it('should use default error middleware whe hitting an endpoint that does not exists', (done) => {
			const { routedApp } = appConfigs;
			ApplicationInterface.construct(routedApp);

			request(ApplicationInterface.getExpressApp())
				.get('/api/v1/non/existent/path')
				.expect(404)
				.end((err, res) => {
					if (err) {
						return done(err);
					}

					expect(res).to.be.an('object');

					expect(res).to.have.property('status');
					expect(res).to.have.property('type');

					expect(res.status).to.be.equal(404);
					expect(res.type).to.be.equal('application/json');

					done();
				});
		});

		it('should use mapReqToObj helper', (done) => {
			const { routedApp } = appConfigs;
			const qs = {
				k1: 'v1',
				k2: 'v2',
			};
			ApplicationInterface.construct(routedApp);

			request(ApplicationInterface.getExpressApp())
				.get(`/api/v1/success_mapReqToObj?${stringify(qs)}`)
				.expect(200)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object');
					expect(body).to.have.property('reqRes');

					expect(body.reqRes).to.be.deep.equal(qs);

					done();
				});
		});

		it('should return 500 when mapReqToObj helper receives a non existent prop', (done) => {
			const { routedApp } = appConfigs;
			const qs = {
				k1: 'v1',
				k2: 'v2',
			};
			ApplicationInterface.construct(routedApp);

			request(ApplicationInterface.getExpressApp())
				.get(`/api/v1/error_mapReqToObj?${stringify(qs)}`)
				.expect(500)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object')
						.that.has.keys('success', 'message', 'errors');

					expect(body.success).to.be.a('boolean');
					expect(body.message).to.be.a('string');
					expect(body.errors).to.be.a('array');

					done();
				});
		});
	});
});
