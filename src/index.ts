import * as express from 'express';
import { expressRouter, endpoint, config, final, prefix } from './decorators';
import { ApplicationInterface } from './lib/applicationInterface';

// foundation libraries
export { express };

// Middleware
export { jwtAuth } from './middleware/jwtAuth';

export {
	// expressApp Interface
	ApplicationInterface,

	// decorators
	expressRouter, endpoint, config, final, prefix,
};
// Interfaces
export {
	IAppConfig,
	IEndpointConfig,
	IRequest,
	IResponse,
} from './interface';
