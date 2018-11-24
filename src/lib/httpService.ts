import * as http from 'http';
import { Application } from 'express';
import { TneLogger } from '@tne/nodejs-app';
import { IAppSettings } from '../interface';
import { LogMessages } from '../constant/LogMessages';
import { Exceptions } from '../constant/Exceptions';

export function startServer(app: Application, getConfig: Function, logger: TneLogger): http.Server {
	const port = getConfig('port');
	let server: http.Server = null;

	logger.info(LogMessages.createHttpServer.replace(':port', `${port}`));
	server = http.createServer(app).listen(port);

	server
		.removeAllListeners('listening')
		.on('listening', onListening(port, logger))
		.removeAllListeners('error')
		.on('error', onError(port, logger));

	return server;
}

export function stopServer(server: http.Server, settings: IAppSettings, logger: TneLogger): Promise<{ app: null, server: null }> {
	return new Promise((Res) => {
		const { port } = settings;

		logger.info(LogMessages.haltingHttpServer.replace(':port', `${port}`));
		server.close(() => {
			logger.info(LogMessages.httpServerHalted.replace(':port', `${port}`));

			return Res({ app: null, server: null });
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
