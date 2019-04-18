import { ErrorRequestHandler, RequestHandler } from 'express';
import { OptionsUrlencoded, OptionsJson } from 'body-parser';
import { ILoggerOpts } from '@tne/logger';
import { CorsOptions } from 'cors';
import { CompressionOptions } from 'compression';

export type middlewareDefaults = 'default';

export interface IHttpsOptions {
	key: string;
	cert: string;
	passphrase: string;
}

export { CorsOptions };
export { CompressionOptions };
export { OptionsUrlencoded };
export { OptionsJson };

export interface IAppSettings {
	[key: string]: any;
	appPath: string;
	environment?: string;
	appName?: string;
	logger?: ILoggerOpts;
	hostname?: string;
	port?: number;
	locals?: any;
	faviconPath?: string;
	publicFolder?: string;
	defaultPage?: number;
	defaultPerPage?: number;
	corsOptions?: middlewareDefaults | CorsOptions;
	compressionOptions?: middlewareDefaults | CompressionOptions;
	urlEncodedOptions?: middlewareDefaults | OptionsUrlencoded;
	jsonOptions?: middlewareDefaults | OptionsJson;
	httpsOptions?: IHttpsOptions;
	appMiddleware?: RequestHandler[];
	routesFolder?: string | string[];
	errorHandler?: ErrorRequestHandler;
}


export type routerMethod =
	'all' |
	'ALL' |
	'DEL' |
	'del' |
	'DELETE' |
	'delete' |
	'GET' |
	'get' |
	'HEAD' |
	'head' |
	'OPTIONS' |
	'options' |
	'PATCH' |
	'patch' |
	'post' |
	'POST' |
	'put' |
	'PUT'
	;

export interface IEndpointSettings {
	method: routerMethod | routerMethod[];
	path: string;
	middleware?: RequestHandler[];
}

