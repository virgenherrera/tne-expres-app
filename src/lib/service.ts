import * as http from 'http';
import * as https from 'https';
import { Application } from 'express';
import { TneLogger } from '@tne/nodejs-app';
import { LogMessages } from '../constant/LogMessages';
import { Exceptions } from '../constant/Exceptions';
import { AddressInfo } from 'net';
import { ExpressApplication } from '../class/expressApplication';
import { IHttpsOptions } from '../interface/IAppSettings';
import { join } from 'path';
import { fileExists } from '@tne/common';
import { readFileSync } from 'fs';
import { parse } from 'url';
import { bindOnListening } from './bindOnListening';

export function start(app: Application, getConfig: Function, logger: TneLogger): http.Server | https.Server {
	const appPath = getConfig('appPath');
	const port = getConfig('port');
	const httpsOptions = getConfig('httpsOptions');

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
			const serviceUrl = getConfig('serviceUrl', 'http://localhost/');
			const { hostname } = parse(serviceUrl);
			const opts: https.ServerOptions = {
				passphrase,
				key: readFileSync(keyPath),
				cert: readFileSync(certPath),
			};

			logger.info(LogMessages.createHttpsServer.replace(':port', `${port}`));
			const server = https.createServer(opts, app)
				.listen(port, hostname);

			server
				.removeAllListeners('listening')
				.on('listening', bindOnListening(server, getConfig, logger, 'https'))
				.removeAllListeners('error')
				.on('error', onError(port, logger));

			return server;

		}
	} else {

		logger.info(LogMessages.createHttpServer.replace(':port', `${port}`));
		const server = http
			.createServer(app)
			.listen(port);
		server
			.removeAllListeners('listening')
			.on('listening', bindOnListening(server, getConfig, logger))
			.removeAllListeners('error')
			.on('error', onError(port, logger));

		return server;
	}
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
export function onError(port, logger: TneLogger) {
	return (E: NodeJS.ErrnoException) => {
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
