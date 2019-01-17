import * as http from 'http';
import { Application } from 'express';
import { TneLogger } from '@tne/nodejs-app';
import { LogMessages } from '../constant/LogMessages';
import { Exceptions } from '../constant/Exceptions';
import { AddressInfo } from 'net';
import { ExpressApplication } from '../class/expressApplication';

export function startServer(app: Application, getConfig: Function, logger: TneLogger): http.Server {
	const port = getConfig('port');

	logger.info(LogMessages.createHttpServer.replace(':port', `${port}`));

	return http
		.createServer(app)
		.listen(port)
		.removeAllListeners('listening')
		.on('listening', onListening(port, logger))
		.removeAllListeners('error')
		.on('error', onError(port, logger));
}

export function stopServer(instance: ExpressApplication): Promise<ExpressApplication> {
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

export function onListening(port, logger: TneLogger) {
	return () => logger.info(LogMessages.httpServerListening.replace(':port', port));
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
