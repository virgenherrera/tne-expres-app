import * as cors from 'cors';
import * as http from 'http';
import { express, jwtAuth } from '../../../src';

export let testServer: http.Server = null;
export let testApp: express.Application = null;
export const testAppRoutes = {
	private: '/api/v1/private',
	failingPrivate: '/api/v1/collapsing'
};

function genAuthData(token: string) {
	return {
		token,
		decodedToken: `decodedToken ${new Date().toISOString()}`,
		user: `user ${new Date().toISOString()}`,
	};
}

async function tokenValidate(token: string): Promise<any> {
	return await genAuthData(token);
}

async function tokenValidateThrow(token: string): Promise<any> {
	throw new TypeError(`bertha has danced with token: ${token}`);
}

export function createTestServer() {
	testApp = express();

	[
		cors(),
		express.json({}),
		express.urlencoded({ extended: false }),
	].forEach(hook => testApp.use(hook));

	testApp.get(testAppRoutes.private, jwtAuth(tokenValidate), (req, res) => res.status(200).json(req['authorization']).end());
	testApp.get(testAppRoutes.failingPrivate, jwtAuth(tokenValidateThrow), (req, res) => res.status(200).json(req['authorization']).end());

	testServer = testApp.listen(3135);

	testServer
		.on('listening', () => console.log('test server started'));

	return testApp;
}

export function destroyTestServer() {
	testServer.close(() => console.log('test server halted'));

	testServer = null;
	testApp = null;
	return null;
}
