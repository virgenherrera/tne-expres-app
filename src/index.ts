import * as express from 'express';
import * as joi from 'joi';

// foundation libraries
export { express, joi };

// main lib
export { ExpressApplication } from './class/expressApplication';

// Middleware
export { jwtAuth } from './middleware/jwtAuth';

// decorators
export { ExpressRouter, Endpoint, Config, FinalClass, Prefix } from './decorator';

// Interfaces
export {
	IAppSettings,
	IEndpointSettings,
	IRequest,
	IResponse,
	IPagedDto,
} from './interface';
