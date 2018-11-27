import { expect, should } from 'chai';
import * as request from 'supertest';
import { ExpressApplication } from '../../src';
import { routedApp } from '../fixtures/customApp/src';
import { dropLogs } from '../helpers';

should();
describe('@tne/express-app res.errorJson Helper', () => {
	before(() => ExpressApplication.construct(routedApp));

	after(async () => {
		const { logsPath } = ExpressApplication.getInstance();
		await ExpressApplication.destruct();

		dropLogs(logsPath);
	});

	it('should return a dto created by class Error400', (done) => {

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
