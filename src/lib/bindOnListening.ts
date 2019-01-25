import { Server as httpServer } from 'http';
import { Server as httpsServer } from 'https';
import { URL } from 'url';
import { networkInterfaces } from 'os';
import { AddressInfo } from 'net';
import { TneLogger } from '@tne/nodejs-app';

export type protocolType = 'http' | 'https';

export function bindOnListening(server: httpServer | httpsServer, getConfig: Function, logger: TneLogger, protocol: protocolType = 'http'): () => void {
	return function onServiceListening(): void {
		const { port } = <AddressInfo>server.address();
		const environment = getConfig('environment');
		const appName = getConfig('appName');
		const hostname = getConfig('hostname', 'localhost');
		const urlObj = new URL(`${protocol}://${hostname}:${port}`);

		logger.info(`"${appName}" is running on port: "${port}" on "${environment}" environment`);
		logger.info(`Listening in the following local addresses:`);
		logger.info(`- ${urlObj.href}`);

		// log local addresses
		const interfaces = networkInterfaces();
		Object.keys(interfaces).forEach(k => {
			Object.keys(interfaces[k]).forEach(l => {
				const address = interfaces[k][l];
				if (address.family === 'IPv4' && !address.internal) {
					urlObj.hostname = address.address;

					logger.info(`- ${urlObj.href}`);
				}
			});
		});
	};
}
