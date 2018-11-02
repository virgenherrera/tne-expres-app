import { expect, should } from 'chai';
import * as request from 'supertest';
import { createTestServer, destroyTestServer, testAppRoutes } from '../fixtures/middleware/jwtAuth';

should();
describe('@tne/express-app jwtAuth Middleware', () => {
	let app = null;

	beforeEach((done) => {
		app = createTestServer();
		return done();
	});
	afterEach((done) => {
		app = destroyTestServer();
		return done();
	});

	it('should validate token according to consumer rules', (done) => {
		const token = `token String ${new Date().toISOString()}`;

		request(app)
			.get(testAppRoutes.private)
			.set('Authorization', token)
			.expect(200)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				expect(res).to.be.an('object');
				expect(res).to.have.property('body');

				expect(res.body).to.be.an('object');
				expect(res.body).to.have.property('token');
				expect(res.body).to.have.property('decodedToken');
				expect(res.body).to.have.property('user');

				expect(res.body.token).to.be.an('string');
				expect(res.body.token).to.be.equal(token);

				done();
			});
	});

	it('should be 401 depending on consumer rules', (done) => {
		const token = `token String ${new Date().toISOString()}`;

		request(app)
			.get(testAppRoutes.failingPrivate)
			.set('Authorization', token)
			.expect(401)
			.end((err, { body }) => {
				if (err) {
					return done(err);
				}

				expect(body).to.be.an('object');
				expect(body).to.have.property('status');
				expect(body).to.have.property('message');
				expect(body).to.have.property('errors');

				expect(body.status).to.be.a('number');
				expect(body.message).to.be.a('string');
				expect(body.errors).to.be.a('array');

				done();
			});
	});
});
