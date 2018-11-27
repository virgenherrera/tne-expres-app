import { pathExists, requireDirSync } from '@tne/common';
import { Application } from 'express';
import { join } from 'path';
import { TneLogger } from '@tne/nodejs-app';
import { LogMessages } from '../constant/LogMessages';
import { appThrowable } from './appThrowable';
import { Exceptions } from '../constant/Exceptions';

export function loadRouterPath(app: Application, appPath: string, routersFolder: string, logger: TneLogger): Application {
	const routesPath = join(appPath, routersFolder);

	logger.info(LogMessages.setExpAppRouters.replace(':path', routesPath));
	if (!pathExists(routesPath)) {
		appThrowable(
			'invalidAppRoutesPath',
			{},
			routesPath,
			logger
		);
	}

	const routers = requireDirSync(routesPath);
	Object.keys(routers).forEach(k => {
		const router = routers[k].default || null;

		if (router) {
			logger.info(LogMessages.setExpAppRoute.replace(':route', k));
			app.use(router.bind(this));
		} else {
			logger.warn(Exceptions.invalidAppRouterExport.replace(':router', k));
		}
	});

	logger.info(LogMessages.setExpAppRoutersEnd);

	return app;
}
