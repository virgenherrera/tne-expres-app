import { ErrorRequestHandler, RequestHandler } from 'express';
import { OptionsUrlencoded, OptionsJson } from 'body-parser';
import { IAppSettings as INodeAppSettings } from '@tne/nodejs-app';
import { CorsOptions } from 'cors';
import { CompressionOptions } from 'compression';

export interface IAppSettings extends INodeAppSettings {
	locals?: any;
	port?: number;
	faviconPath?: string;
	publicFolder?: string;
	defaultPage?: number;
	defaultPerPage?: number;
	corsOptions?: CorsOptions;
	compressionOptions?: CompressionOptions;
	urlEncodedOptions?: OptionsUrlencoded;
	jsonOptions?: OptionsJson;
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

