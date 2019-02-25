import { readFileSync } from 'fs';
import { join } from 'path';
import { expect, should } from 'chai';
import * as request from 'supertest';
import { ExpressApplication } from '../../src';
import { Exceptions } from '../../src/constant/Exceptions';
import * as appConfigs from '../fixtures/customApp/src';
import { dropLogs } from '../helpers';

should();
describe('@tne/express-app Interface test', () => {
	afterEach(async () => {
		await ExpressApplication.destruct();

		dropLogs(join(__dirname, '../fixtures/customApp/logs'));
	});

	it('should include custom locals on app locals', (done) => {
		const { baseAppSettings } = appConfigs;
		const { locals } = baseAppSettings;

		ExpressApplication.construct(baseAppSettings);

		const instance = ExpressApplication.getInstance();
		expect(instance).to.have.property('appLocals');

		Object.keys(locals).forEach((local, k, arr) => {
			expect(instance.appLocals).to.be.an('object')
				.that.haveOwnProperty(local);
			expect(instance.appLocals[local]).to.be.equal(locals[local]);

			if (arr.length === k + 1) {
				return done();
			}
		});
	});

	it('should include buildUrl helper function', (done) => {

		ExpressApplication.construct(appConfigs.baseAppSettings);

		const instance = ExpressApplication.getInstance();
		expect(instance).to.have.property('buildUrl');

		const uriSegments = ['segmentOne', 'segmentTwo', 'segmentThree'];
		const builtUrl = instance.buildUrl(...uriSegments);

		expect(builtUrl).to.contain(instance.getConfig('hostname', 'localhost'));
		expect(builtUrl).to.contain(instance.getConfig('port'));

		uriSegments.forEach((segment, k, arr) => {
			expect(builtUrl).to.contain(segment);

			if (arr.length === k + 1) {
				return done();
			}
		});
	});

	it('should create an express app that exposes a public path', (done) => {
		const { publicPathAppSettings } = appConfigs;
		ExpressApplication.construct(publicPathAppSettings);

		const content = readFileSync(join(__dirname, '../fixtures/customApp/public/index.html')).toString();

		request(ExpressApplication.getExpressApp())
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

	it('should throw when trying to create an express app that exposes an invalid public path', () => {
		const { publicPathAppSettings } = appConfigs;
		const settings = Object.assign({}, publicPathAppSettings, { publicFolder: '/nonExistentFolder' });

		expect(() => ExpressApplication.construct(settings)).to.throw(new RegExp(Exceptions.expAppBadPublicFolder));
	});

	it('should create an express app that exposes a public path and a favicon', (done) => {
		const { faviconAppSettings } = appConfigs;
		ExpressApplication.construct(faviconAppSettings);

		request(ExpressApplication.getExpressApp())
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

	it('should throw when trying to create an express app that exposes a public path and an invalid favicon path', () => {
		const { faviconAppSettings } = appConfigs;
		const settings = Object.assign({}, faviconAppSettings, { faviconPath: '/nonExistentFolder/nonoExistenFaviconFile.ico' });

		expect(() => ExpressApplication.construct(settings)).to.throw(new RegExp(Exceptions.expAppBadFaviconFile));
	});

	it('should create an express app that exposes rest endpoints', (done) => {
		const { routedApp } = appConfigs;
		ExpressApplication.construct(routedApp);

		request(ExpressApplication.getExpressApp())
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

	it('should throw when tying to create an express app wxith a bad routesFolder argument', () => {
		const { routedAppBadRoutesFolder } = appConfigs;

		expect(() => ExpressApplication.construct(routedAppBadRoutesFolder)).to.throw();
	});

	it('should create an express app that exposes rest endpoints placed on several folders', (done) => {
		const { manyRoutesFolderApp } = appConfigs;
		ExpressApplication.construct(manyRoutesFolderApp);

		request(ExpressApplication.getExpressApp())
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

	it('should use default error middleware whe hxitting an endpoint that does not exists', (done) => {
		const { routedApp } = appConfigs;
		ExpressApplication.construct(routedApp);

		request(ExpressApplication.getExpressApp())
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

	it('should getConfig find data from process.env when envVal begins with "$keys."', () => {

		const keys = require('../fixtures/customApp/config/keys.json');

		ExpressApplication.construct(appConfigs.baseAppSettings);

		const instance = ExpressApplication.getInstance();
		expect(instance).to.have.property('getConfig');

		const { getConfig } = instance;
		expect(getConfig).to.be.a('function');


		expect(getConfig('database.mongoose.user')).to.be.equal(keys.database.username);
		expect(getConfig('database.mongoose.pass')).to.be.equal(keys.database.password);
	});

	it('should getConfig find data from process.env when envVal begins with "$env."', () => {
		ExpressApplication.construct(appConfigs.baseAppSettings);

		const instance = ExpressApplication.getInstance();
		expect(instance).to.have.property('getConfig');

		const { getConfig } = instance;
		expect(getConfig).to.be.a('function');


		expect(getConfig('someConf')).to.be.equal(process.env.NODE_ENV);
		expect(getConfig('someConf2')).to.be.equal(process.env.PWD);
	});
});
