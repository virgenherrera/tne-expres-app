import { join } from 'path';
import { expect, should } from 'chai';
import * as request from 'supertest';
import * as rimraf from 'rimraf';
import { ApplicationInterface } from '../../src';
import { routedApp } from '../fixtures/customApp/src';

should();
describe('@tne/express-app Interface test', () => {
	afterEach((done) => {
		ApplicationInterface.destruct();

		rimraf(join(__dirname, '../fixtures/customApp/logs'), () => done());
	});

	describe('Express Application() res.successJson Helper', () => {


		it('should return a dto created by class PUT', (done) => {
			ApplicationInterface.construct(routedApp);

			request(ApplicationInterface.getExpressApp())
				.get('/api/v1/success_put')
				.expect(200)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object')
						.that.has.keys('success', 'message', 'data');

					expect(body.success).to.be.an('boolean');
					expect(body.message).to.be.an('string');
					expect(body.data).to.be.an('object');

					done();
				});
		});

		it('should return a dto created by class DELETE', (done) => {
			ApplicationInterface.construct(routedApp);

			request(ApplicationInterface.getExpressApp())
				.get('/api/v1/success_delete')
				.expect(200)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object')
						.that.has.keys('success', 'message', 'data');

					expect(body.success).to.be.an('boolean');
					expect(body.message).to.be.an('string');
					expect(body.data).to.be.an('object');

					done();
				});
		});

		it('should return a dto created by class POST', (done) => {
			ApplicationInterface.construct(routedApp);

			request(ApplicationInterface.getExpressApp())
				.get('/api/v1/success_post')
				.expect(201)
				.end((err, { body }) => {
					if (err) {
						return done(err);
					}

					expect(body).to.be.an('object')
						.that.has.keys('success', 'message', 'data');

					expect(body.success).to.be.an('boolean');
					expect(body.message).to.be.an('string');
					expect(body.data).to.be.an('object');

					done();
				});
		});

		describe('Http204 test suite', () => {
			it('should return a dto created by class Http204', (done) => {
				ApplicationInterface.construct(routedApp);

				request(ApplicationInterface.getExpressApp())
					.get('/api/v1/success_http204')
					.expect(204)
					.end((err, { body }) => {
						if (err) {
							return done(err);
						}

						expect(body).to.be.an('object');
						expect(body).to.be.deep.equal({});

						done();
					});
			});

			it('should return a dto created by class Http204', (done) => {
				ApplicationInterface.construct(routedApp);

				request(ApplicationInterface.getExpressApp())
					.get('/api/v1/success_204')
					.expect(204)
					.end((err, { body }) => {
						if (err) {
							return done(err);
						}

						expect(body).to.be.an('object');
						expect(body).to.be.deep.equal({});

						done();
					});
			});

			it('should return a dto created by class Http204', (done) => {
				ApplicationInterface.construct(routedApp);

				request(ApplicationInterface.getExpressApp())
					.get('/api/v1/success_no_content')
					.expect(204)
					.end((err, { body }) => {
						if (err) {
							return done(err);
						}

						expect(body).to.be.an('object');
						expect(body).to.be.deep.equal({});

						done();
					});
			});
		});

		describe('GET test suite', () => {
			it('should return a dto created by class GET', (done) => {
				ApplicationInterface.construct(routedApp);

				request(ApplicationInterface.getExpressApp())
					.get('/api/v1/success_get')
					.expect(200)
					.end((err, { body }) => {
						if (err) {
							return done(err);
						}

						expect(body).to.be.an('object')
							.that.has.keys('success', 'message', 'data');

						expect(body.success).to.be.an('boolean');
						expect(body.message).to.be.an('string');
						expect(body.data).to.be.an('object');

						done();
					});
			});

			it('should return a dto created by class GET with paging args', (done) => {
				ApplicationInterface.construct(routedApp);

				request(ApplicationInterface.getExpressApp())
					.get('/api/v1/success_with_paging')
					.expect(200)
					.end((err, { body }) => {
						if (err) {
							return done(err);
						}

						expect(body).to.be.an('object')
							.that.has.keys('success', 'message', 'data', 'paging');

						expect(body.success).to.be.an('boolean');
						expect(body.message).to.be.an('string');
						expect(body.data).to.be.an('array');
						expect(body.paging).to.be.an('object')
							.that.has.keys('count', 'page', 'prev', 'next');

						done();
					});
			});
		});
	});
});
