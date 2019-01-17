import { notFound } from '../middleware/notFound';

export const APP_DEFAULTS = {
	appName: 'express-app',
	locals: null,
	port: 3000,
	viewsConfig: null,
	appMiddleware: [],
	publicFolder: null,
	faviconPath: null,
	routesFolder: null,
	errorHandler: notFound,
};

export const PAGE = 1;
export const PER_PAGE = 50;
