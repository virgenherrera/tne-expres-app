import * as express from 'express';
import * as joi from 'joi';

// foundation libraries
export { express, joi };

// expressApp Interface
export { ExpressApplication } from './class/expressApplication';

// Middleware
export { jwtAuth } from './middleware/jwtAuth';

// decorators
export { expressRouter, endpoint, config, final, prefix } from './decorators';

// Interfaces
export {
	IAppSettings,
	IEndpointSettings,
	IRequest,
	IResponse,
	IPagedDto,
} from './interface';
