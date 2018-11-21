
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

export function buildExpressApp(getConfig: Function, logger: TneLogger): express.Application {
	let app: express.Application = null;

	// step 0 initExpressApp
	app = initExpressApp(logger);
	// step 1 setPort
	app = setAppPort(app, getConfig, logger);
	// step 2 setAppLocals
	app = setAppLocals(app, getConfig, logger);
	// step 3 setAppViews
	app = setAppViews(app, getConfig, logger);
	// step 4 setupAppMiddleware
	app = setupAppMiddleware(app, getConfig, logger);
	// step 5 setupPublicPath
	app = setupPublicPath(app, getConfig, logger);
	// step 6 setupFavicon
	app = setupFavicon(app, getConfig, logger);
	// step 7 setupAppRouters
	app = setupAppRouters(app, getConfig, logger);
	// step 8 setErrorHandler
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

export function setAppViews(app: express.Application, getConfig: Function, logger: TneLogger): express.Application {
	const appPath = getConfig('appPath');
	const viewsConfig = getConfig('viewsConfig ');

	if (viewsConfig) {
		const { viewsFolder, viewsEngine } = viewsConfig;
		const viewsPath = join(appPath, viewsFolder);

		if (pathExists(viewsPath)) {
			logger.info(LogMessages.expAppSetAppViews.replace(':engine', viewsEngine).replace(':path', viewsPath));
			app.set('views', viewsPath);
			app.set('view engine', viewsEngine);
		} else {
			appThrowable(
				'expAppBadViewsFolder',
				{ ':viewsFolder': viewsFolder },
				viewsPath,
				logger
			);
		}
	}

	return app;
}

export function setupAppMiddleware(app: express.Application, getConfig: Function, logger: TneLogger): express.Application {
	const urlEncodedConfig = getConfig('bodyParser.urlEncoded', { extended: false });
	const jsonConfig = getConfig('bodyParser.json', {});
	const preRouteHooks = getConfig('preRouteHooks', []);
	const morganConfig = { stream: { write: logger.info.bind(this) } };

	logger.info(LogMessages.expAppSetupAppMiddleware);


	/* app preRouteHooks (Middleware) */
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
		cors(),
		// Enable gzip compression
		compression(),
		// Accept JSON requests
		express.json(jsonConfig),
		// Accept urlEncoded requests
		express.urlencoded(urlEncodedConfig),

		// Publish success/error helpers
		dtoJsonResponses,

		// Append mapReqToObj function to request Object
		mapReqToObjMiddleware,

		...preRouteHooks,
	].forEach(appHook => app.use(appHook));

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
