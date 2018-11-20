import { Server, IncomingMessage, ServerResponse } from 'http';
import {
	ErrorRequestHandler,
	Application,
	RequestHandler,
} from 'express';

export interface IViewsSettings {
	viewsFolder: string;
	viewsEngine: string;
}

export interface IBodyParserOptions {
	inflate?: boolean;
	limit?: number | string;
	type?: string | string[] | ((req: IncomingMessage) => any);
	verify?(req: IncomingMessage, res: ServerResponse, buf: Buffer, encoding: string): void;
}

interface IOptionsUrlencoded extends IBodyParserOptions {
	extended?: boolean;
	parameterLimit?: number;
}

export interface IOptionsJson extends IBodyParserOptions {
	strict?: boolean;
	reviver?(key: string, value: any): any;
}

export interface IBodyParser {
	urlEncoded: IOptionsUrlencoded;
	json: IOptionsJson;
}

export interface IAppConfig {
	appPath: string;
	appName?: string;
	locals?: any;
	port?: number;
	environment?: string;
	viewsConfig?: IViewsSettings;
	bodyParser?: IBodyParser;
	preRouteHooks?: RequestHandler[];
	publicFolder?: string;
	faviconPath?: string;
	routesFolder?: string | string[];
	errorHandler?: ErrorRequestHandler;
}

export interface IPagingConfig {
	uri: string;
	count: number;
	page: number;
	per_page: number;
	queryStringArgs?: any;
}

export interface IAuthorization {
	token: string;
	decodedToken: any;
	user: any;
}

export interface IEndpointConfig {
	method: string | string[];
	path: string;
	middleware?: RequestHandler[];
}

export interface IExpressCoreApplication {
	app: Application;
	server: Server;
	readonly appLocals: any;
	stopServer(): Promise<IExpressCoreApplication>;
}

export { IErrorDto } from './IErrorDto';
export { ISuccessDto } from './ISuccessDto';
export { IRequest } from './IRequest';
export { IResponse } from './IResponse';
