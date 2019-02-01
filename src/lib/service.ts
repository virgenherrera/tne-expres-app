import { AddressInfo } from 'net';
import { Application } from 'express';
import { join } from 'path';
import { networkInterfaces } from 'os';
import { readFileSync } from 'fs';
import { URL } from 'url';
import * as http from 'http';
import * as https from 'https';
import { fileExists } from '@tne/common';
import { Exceptions } from '../constant/Exceptions';
import { ExpressApplication } from '../class/expressApplication';
import { IHttpsOptions } from '../interface/IAppSettings';
import { LogMessages } from '../constant/LogMessages';
import { protocolType, loggerType, serverType } from '../interface/types';

export function start(app: Application, getConfig: Function, logger: loggerType): serverType {
	const appName = getConfig('appName');
	const appPath = getConfig('appPath');
	const environment = app.get('environment');
	const hostname = getConfig('hostname');
	const httpsOptions = getConfig('httpsOptions');
	const port = getConfig('port');
	let server: serverType = null;

	if (httpsOptions) {
		const { key = '', cert = '', passphrase = '' } = <IHttpsOptions>new Object(httpsOptions);
		const keyPath = join(appPath, key);
		const certPath = join(appPath, cert);
		let msg;

		if (!key) {
			msg = 'Error! Missing required https config: key relative path';
			logger.error(msg);
			throw new Error(msg);
		} else if (!cert) {
			msg = 'Error! Missing required https config: cert relative path';
			logger.error(msg);
			throw new Error(msg);
		} else if (!passphrase) {
			msg = 'Error! Missing required https config: passphrase';
			logger.error(msg);
			throw new Error(msg);
		} else if (!fileExists(keyPath)) {
			msg = 'Error! https config: key relative path does not lead to an existent file';
			logger.error(msg);
			throw new Error(msg);
		} else if (!fileExists(certPath)) {
			msg = 'Error! https config: cert relative path does not lead to an existent file';
			logger.error(msg);
			throw new Error(msg);
		} else {
			const opts: https.ServerOptions = {
				passphrase,
				key: readFileSync(keyPath),
				cert: readFileSync(certPath),
			};

			logger.info(LogMessages.createHttpsServer.replace(':port', `${port}`));
			return https.createServer(opts, app).listen(port, hostname);
		}
	} else {

		logger.info(LogMessages.createHttpServer.replace(':port', `${port}`));
		server = http.createServer(app).listen(port);
	}

	server
		.removeAllListeners('error')
		.removeAllListeners('listening')
		.on('error', bindOnError(port, logger))
		.on('listening', bindOnListening(appName, environment, 'http', hostname, port, logger));

	return server;
}

export function stop(instance: ExpressApplication): Promise<ExpressApplication> {
	return new Promise((Res) => {
		const { getConfig, logger, server } = instance;
		let { port } = <AddressInfo>server.address();
		port = getConfig('port', port);

		logger.info(LogMessages.haltingHttpServer.replace(':port', `${port}`));
		server.close(() => {
			logger.info(LogMessages.httpServerHalted.replace(':port', `${port}`));

			instance.app = null;
			instance.server = null;

			return Res(instance);
		});
	});
}

export function bindOnListening(appName: string, environment: string, protocol: protocolType, hostname: string, port: string, logger: loggerType): () => void {
	return function onServiceListening(): void {
		const urlObj = new URL(`${protocol}://${hostname}:${port}`);

		logger.info(`"${appName}" is running on port: "${port}" on "${environment}" environment`);

		// log hostname
		if (hostname !== 'localhost') {
			logger.info(`Listening in the following hostname:`);
			logger.info(`- ${urlObj.href}`);
		}

		// log local hosts
		logger.info(`Listening in the following local addresses:`);
		['localhost', '127.0.0.1'].forEach(localhost => {
			urlObj.hostname = localhost;
			logger.info(`- ${urlObj.href}`);
		});

		// log network interfaces
		logger.info(`Listening in the following local network addresses:`);
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

export function bindOnError(port, logger: loggerType) {
	return function onError(E: NodeJS.ErrnoException) {
		if (E.syscall !== 'listen') {
			logger.error(E);
			throw E;
		}

		const bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;

		switch (E.code) {
			case 'EACCES':
				logger.error(Exceptions.srvEAccess.replace(':bind', bind));
				throw Exceptions.srvEAccess.replace(':bind', bind);
			case 'EADDRINUSE':
				logger.error(Exceptions.srvEAddrInUse.replace(':bind', bind));
				throw Exceptions.srvEAddrInUse.replace(':bind', bind);
			default:
				logger.error(E);
				throw E;
		}
	};
}
