import { notFound } from '../middleware/notFound';

export enum Defaults {
	configFolder = '../config',
	environment = 'development',
	logsFolder = '../logs',
}


export const APP_DEFAULTS = {
	environment: process.env.NODE_ENV || Defaults.environment,
	appName: 'express-app',
	locals: null,
	port: process.env.PORT || 3000,
	hostname: 'localhost',
	viewsConfig: null,
	appMiddleware: [],
	publicFolder: null,
	faviconPath: null,
	routesFolder: null,
	errorHandler: notFound,
};

export const PAGE = 1;
export const PER_PAGE = 50;
