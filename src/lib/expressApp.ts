
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';
import * as serveFavicon from 'serve-favicon';
import { join } from 'path';
import { TneLogger } from '@tne/nodejs-app';
import { pathExists, fileExists } from '@tne/common';
import { appThrowable } from './appThrowable';
import { loadRouterPath } from './loadRouterPath';
import { LogMessages } from '../constant/LogMessages';
import { mapReqToObjMiddleware } from '../middleware/mapReqToObj';
import { dtoJsonResponses } from '../middleware/dtoJsonResponses';
import { publishPager } from '../middleware/publishPager';

export function buildExpressApp(getConfig: Function, logger: TneLogger): express.Application {
	let app: express.Application = null;

	// initExpressApp
	app = initExpressApp(logger);
	// setPort
	app = setAppPort(app, getConfig, logger);
	// setAppLocals
	app = setAppLocals(app, getConfig, logger);
	// setupAppMiddleware
	app = setupAppMiddleware(app, getConfig, logger);
	// setupPublicPath
	app = setupPublicPath(app, getConfig, logger);
	// setupFavicon
	app = setupFavicon(app, getConfig, logger);
	// setupAppRouters
	app = setupAppRouters(app, getConfig, logger);
	// setErrorHandler
	app = setErrorHandler(app, getConfig, logger);

	return app;
}

export function initExpressApp(logger: TneLogger): express.Application {
	logger.info(LogMessages.expAppInitExpressApp);

	return express();
}

export function setAppPort(app: express.Application, getConfig: Function, logger: TneLogger): express.Application {
	const port = getConfig('port');

	logger.info(LogMessages.expAppSetAppPort.replace(':port', `${port}`));
	app.set('port', port);

	return app;
}

export function setAppLocals(app: express.Application, getConfig: Function, logger: TneLogger): express.Application {
	const locals = getConfig('locals', {});

	logger.info(LogMessages.expAppSetAppLocals);
	Object.assign(app.locals, { ...locals }, app.locals);

	return app;
}

export function setupAppMiddleware(app: express.Application, getConfig: Function, logger: TneLogger): express.Application {
	const morganConfig = { stream: { write: logger.info.bind(this) } };
	const corsOptions = getConfig('corsOptions', {});
	const compressionOptions = getConfig('compressionOptions', {});
	const urlEncodedOptions = getConfig('urlEncodedOptions', { extended: false });
	const jsonOptions = getConfig('jsonOptions', {});
	const appMiddleware = getConfig('appMiddleware', []);

	logger.info(LogMessages.expAppSetupAppMiddleware);

	/* app appMiddleware (Middleware) */
	[
		// make available the app's logger in the req object.
		(...args) => {
			const [req, , next] = args;

			req.logger = logger;

			return next();
		},
		// express logger
		morgan('dev', morganConfig),
		// Enable CORS
		cors(corsOptions),
		// Enable gzip compression
		compression(compressionOptions),
		// Accept urlEncoded requests
		express.urlencoded(urlEncodedOptions),
		// Accept JSON requests
		express.json(jsonOptions),
		// Publish success/error helpers
		dtoJsonResponses,
		// Append mapReqToObj function to request Object
		mapReqToObjMiddleware,
		// Append pager to request Object
		publishPager(getConfig),

		...appMiddleware,
	].forEach(middleware => app.use(middleware));

	return app;
}

export function setupPublicPath(app: express.Application, getConfig: Function, logger: TneLogger): express.Application {
	const appPath = getConfig('appPath');
	const publicFolder = getConfig('publicFolder');

	if (publicFolder) {
		const publicPath = join(appPath, publicFolder);

		if (pathExists(publicPath)) {
			logger.info(LogMessages.expAppSetupAppPublic.replace(':path', publicPath));
			app.use(express.static(publicPath));
		} else {
			appThrowable(
				'expAppBadPublicFolder',
				{},
				publicPath,
				logger
			);
		}
	}

	return app;
}

export function setupFavicon(app: express.Application, getConfig: Function, logger: TneLogger): express.Application {
	const appPath = getConfig('appPath');
	const faviconPath = getConfig('faviconPath');

	if (faviconPath) {
		const faviconFullPath = join(appPath, faviconPath);

		if (fileExists(faviconFullPath)) {
			logger.info(LogMessages.expAppSetupSppFavicon.replace(':path', faviconFullPath));
			app.use(serveFavicon(faviconFullPath));
		} else {
			appThrowable(
				'expAppBadFaviconFile',
				{},
				appPath,
				logger
			);
		}
	}

	return app;
}

export function setupAppRouters(app: express.Application, getConfig: Function, logger: TneLogger): express.Application {
	const appPath = getConfig('appPath');
	const environment = getConfig('environment');
	const routesFolder = getConfig('routesFolder');

	if (typeof routesFolder === 'string') {
		logger.info(LogMessages.setExpAppRoutersDetected.replace(':num', '1').replace(':env', environment));

		loadRouterPath(app, appPath, routesFolder, logger);
	} else if (Array.isArray(routesFolder) && routesFolder.length > 0) {
		logger.info(LogMessages.setExpAppRoutersDetected.replace(':num', `${routesFolder.length}`).replace(':env', environment));

		routesFolder.forEach(folder => loadRouterPath(app, appPath, folder, logger));
	}

	return app;
}

export function setErrorHandler(app: express.Application, getConfig: Function, logger: TneLogger): express.Application {
	const errorHandler = getConfig('errorHandler');

	logger.info(LogMessages.setExpAppErrorHandler);
	app.use(errorHandler);

	return app;
}
