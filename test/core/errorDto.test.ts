import { join } from 'path';
import { expect, should } from 'chai';
import * as request from 'supertest';
import * as rimraf from 'rimraf';
import { ExpressApplication } from '../../src';
import * as appConfigs from '../fixtures/customApp/src';

should();
describe('@tne/express-app Interface test', () => {
	afterEach((done) => {
		ExpressApplication.destruct();

		rimraf(join(__dirname, '../fixtures/customApp/logs'), () => done());
	});

	describe('Express Application() res.errorJson Helper', () => {
		it('should return a dto created by class Error400', (done) => {
			const { routedApp } = appConfigs;
			ExpressApplication.construct(routedApp);

			request(ExpressApplication.getExpressApp())
				.get('/api/v1/error_400')
				.expect(400)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object')
						.that.has.keys('success', 'message', 'errors');

					expect(body.success).to.be.an('boolean');
					expect(body.message).to.be.an('string');
					expect(body.errors).to.be.an('array');

					done();
				});
		});

		it('should return a dto created by class Error401', (done) => {
			const { routedApp } = appConfigs;
			ExpressApplication.construct(routedApp);

			request(ExpressApplication.getExpressApp())
				.get('/api/v1/error_401')
				.expect(401)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object')
						.that.has.keys('success', 'message', 'errors');

					expect(body.success).to.be.an('boolean');
					expect(body.message).to.be.an('string');
					expect(body.errors).to.be.an('array');

					done();
				});
		});

		it('should return a dto created by class Error403', (done) => {
			const { routedApp } = appConfigs;
			ExpressApplication.construct(routedApp);

			request(ExpressApplication.getExpressApp())
				.get('/api/v1/error_403')
				.expect(403)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object')
						.that.has.keys('success', 'message', 'errors');

					expect(body.success).to.be.an('boolean');
					expect(body.message).to.be.an('string');
					expect(body.errors).to.be.an('array');

					done();
				});
		});

		it('should return a dto created by class Error404', (done) => {
			const { routedApp } = appConfigs;
			ExpressApplication.construct(routedApp);

			request(ExpressApplication.getExpressApp())
				.get('/api/v1/error_404')
				.expect(404)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object')
						.that.has.keys('success', 'message', 'errors');

					expect(body.success).to.be.an('boolean');
					expect(body.message).to.be.an('string');
					expect(body.errors).to.be.an('array');

					done();
				});
		});

		it('should return a dto created by class Error406', (done) => {
			const { routedApp } = appConfigs;
			ExpressApplication.construct(routedApp);

			request(ExpressApplication.getExpressApp())
				.get('/api/v1/error_406')
				.expect(406)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object')
						.that.has.keys('success', 'message', 'errors');

					expect(body.success).to.be.an('boolean');
					expect(body.message).to.be.an('string');
					expect(body.errors).to.be.an('array');

					done();
				});
		});

		it('should return a dto created by class Error500', (done) => {
			const { routedApp } = appConfigs;
			ExpressApplication.construct(routedApp);

			request(ExpressApplication.getExpressApp())
				.get('/api/v1/error_500')
				.expect(500)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object')
						.that.has.keys('success', 'message', 'errors');

					expect(body.success).to.be.an('boolean');
					expect(body.message).to.be.an('string');
					expect(body.errors).to.be.an('array');

					done();
				});
		});

		it('should return a dto created by class Error500 on bad verb', (done) => {
			const { routedApp } = appConfigs;
			ExpressApplication.construct(routedApp);

			request(ExpressApplication.getExpressApp())
				.get('/api/v1/wrong_verb')
				.expect(500)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object')
						.that.has.keys('success', 'message', 'errors');

					expect(body.success).to.be.an('boolean');
					expect(body.message).to.be.an('string');
					expect(body.errors).to.be.an('array');

					done();
				});
		});
	});
});
