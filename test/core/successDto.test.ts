import { expect, should } from 'chai';
import * as request from 'supertest';
import { ExpressApplication } from '../../src';
import { routedApp } from '../fixtures/customApp/src';
import { stringify } from 'querystring';
import { PAGE, PER_PAGE } from '../../src/constant/config';
import { dropLogs } from '../helpers';


should();
describe('@tne/express-app successDtp test Suite', () => {
	before(() => ExpressApplication.construct(routedApp));

	after(async () => {
		const { logsPath } = ExpressApplication.getInstance();
		await ExpressApplication.destruct();

		dropLogs(logsPath);
	});

	it('should return a dto created by class PUT', (done) => {

		request(ExpressApplication.getExpressApp())
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

		request(ExpressApplication.getExpressApp())
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

		request(ExpressApplication.getExpressApp())
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

			request(ExpressApplication.getExpressApp())
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

			request(ExpressApplication.getExpressApp())
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

			request(ExpressApplication.getExpressApp())
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

			request(ExpressApplication.getExpressApp())
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

			request(ExpressApplication.getExpressApp())
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

	it('should use mapReqToObj helper', (done) => {
		const qs = {
			k1: 'v1',
			k2: 'v2',
		};
		ExpressApplication.construct(routedApp);

		request(ExpressApplication.getExpressApp())
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
		const qs = {
			k1: 'v1',
			k2: 'v2',
		};
		ExpressApplication.construct(routedApp);

		request(ExpressApplication.getExpressApp())
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

	it('should find Pager args on queryArgs', (done) => {
		const qs = {
			page: 5,
			per_page: 70,
		};
		ExpressApplication.construct(routedApp);

		request(ExpressApplication.getExpressApp())
			.get(`/api/v1/pager_helper?${stringify(qs)}`)
			.expect(200)
			.end((err, { body }) => {
				if (err) {
					return done(err);
				}

				expect(body).to.be.an('object')
					.that.has.keys(Object.keys(qs));

				expect(body.page).to.be.equal(qs.page);
				expect(body.per_page).to.be.equal(qs.per_page);

				done();
			});
	});

	it('should find Pager args on body', (done) => {
		const data = {
			page: 5,
			per_page: 70,
		};
		ExpressApplication.construct(routedApp);

		request(ExpressApplication.getExpressApp())
			.post(`/api/v1/pager_helper`)
			.send(data)
			.expect(200)
			.end((err, { body }) => {
				if (err) {
					return done(err);
				}

				expect(body).to.be.an('object')
					.that.has.keys(Object.keys(data));

				expect(body.page).to.be.equal(data.page);
				expect(body.per_page).to.be.equal(data.per_page);

				done();
			});
	});

	it('should find Pager args on headers', (done) => {
		const data = {
			page: 5,
			per_page: 70,
		};
		ExpressApplication.construct(routedApp);

		request(ExpressApplication.getExpressApp())
			.post(`/api/v1/pager_helper`)
			.set(data)
			.expect(200)
			.end((err, { body }) => {
				if (err) {
					return done(err);
				}

				expect(body).to.be.an('object')
					.that.has.keys(Object.keys(data));

				expect(body.page).to.be.equal(data.page);
				expect(body.per_page).to.be.equal(data.per_page);

				done();
			});
	});

	it('should return Pager with default args', (done) => {
		const data = {
			page: PAGE,
			per_page: PER_PAGE,
		};
		ExpressApplication.construct(routedApp);

		request(ExpressApplication.getExpressApp())
			.get(`/api/v1/pager_helper`)
			.expect(200)
			.end((err, { body }) => {
				if (err) {
					return done(err);
				}

				expect(body).to.be.an('object')
					.that.has.keys(Object.keys(data));

				expect(body.page).to.be.equal(data.page);
				expect(body.per_page).to.be.equal(data.per_page);

				done();
			});
	});

	it('should return 400 when Pager args are invalid', (done) => {
		const data = {
			page: 'PAGE',
			per_page: 'ñ',
		};
		ExpressApplication.construct(routedApp);

		request(ExpressApplication.getExpressApp())
			.post(`/api/v1/pager_helper`)
			.send(data)
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
});
