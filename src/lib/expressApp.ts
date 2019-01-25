import * as express from 'express';
import * as compression from 'compression';
import * as cors from 'cors';
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
	const morganConfig = { stream: { write: logger.info } };
	const corsOptions = getConfig('corsOptions');
	const compressionOptions = getConfig('compressionOptions');
	const urlEncodedOptions = getConfig('urlEncodedOptions');
	const jsonOptions = getConfig('jsonOptions');
	const appMiddleware = getConfig('appMiddleware', []);

	logger.info(LogMessages.expAppSetupAppMiddleware);

	/* app appMiddleware (Middleware) */
	const serviceMiddleware = [
		// make available the app's logger in the req object.
		(...args) => {
			const [req, , next] = args;

			req.logger = logger;

			return next();
		},
		// express logger
		morgan('tiny', morganConfig),
		// Publish success/error helpers
		dtoJsonResponses,
		// Append mapReqToObj function to request Object
		mapReqToObjMiddleware,
		// Append pager to request Object
		publishPager(getConfig),
	];

	// Enable CORS
	if (corsOptions === 'default') {
		logger.info('- App is using cors default config');
		serviceMiddleware.push(cors({}));
	} else if (corsOptions) {
		logger.info('- App is using cors custom config');
		serviceMiddleware.push(cors(corsOptions));
	} else {
		logger.warn('- App is not using cors');
	}

	// Enable gzip compression
	if (compressionOptions === 'default') {
		logger.info('- App is using compression default config');
		serviceMiddleware.push(compression({}));
	} else if (compressionOptions) {
		logger.info('- App is using compression custom config');
		serviceMiddleware.push(compression(compressionOptions));
	} else {
		logger.warn('- App is not using compression');
	}

	// Accept urlEncoded requests
	if (urlEncodedOptions === 'default') {
		logger.info('- App is using express.urlencoded default config');
		serviceMiddleware.push(express.urlencoded({ extended: false }));
	} else if (urlEncodedOptions) {
		logger.info('- App is using express.urlencoded custom config');
		serviceMiddleware.push(express.urlencoded(urlEncodedOptions));
	} else {
		logger.warn('- App is not using express.urlencoded');
	}

	// Accept JSON requests
	if (jsonOptions === 'default') {
		logger.info('- App is using express.json default config');
		serviceMiddleware.push(express.json({}));
	} else if (jsonOptions) {
		logger.info('- App is using express.json custom config');
		serviceMiddleware.push(express.json(jsonOptions));
	} else {
		logger.warn('- App is not using express.json');
	}

	if (appMiddleware.length > 0) {
		logger.info(`- App is using "${appMiddleware.length}" custom Application-level middleware`);
		serviceMiddleware.concat(appMiddleware);
	}

	serviceMiddleware.forEach(middleware => app.use(middleware));

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
