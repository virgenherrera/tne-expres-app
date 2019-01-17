import { pathExists } from '@tne/common';
import { Application } from 'express';
import { join, parse } from 'path';
import { TneLogger } from '@tne/nodejs-app';
import { LogMessages } from '../constant/LogMessages';
import { appThrowable } from './appThrowable';
import { Exceptions } from '../constant/Exceptions';
import { readdirSync } from 'fs';

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

	readdirSync(routesPath)
		.forEach(file => {
			const filePath = join(routesPath, file);
			const { name, ext } = parse(filePath);

			if (['.ts', '.js'].indexOf(ext) < 0 || name === 'index') { return; }

			const module = require(filePath);
			const router = module.default || null;

			if (router) {
				logger.info(LogMessages.setExpAppRoute.replace(':route', name));
				app.use(router);
			} else {
				logger.warn(Exceptions.invalidAppRouterExport.replace(':router', name));
			}
		});

	logger.info(LogMessages.setExpAppRoutersEnd);

	return app;
}
