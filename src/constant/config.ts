import { notFound } from '../middleware/notFound';

export const APP_DEFAULTS = {
	appName: 'express-app',
	locals: null,
	port: 3000,
	environment: 'development',
	viewsConfig: null,
	bodyParser: null,
	preRouteHooks: [],
	publicFolder: null,
	faviconPath: null,
	routesFolder: null,
	errorHandler: notFound,
	httpsOptions: null,
};
