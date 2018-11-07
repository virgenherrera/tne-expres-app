import * as express from 'express';
import { expressRouter, endpoint, config, final, prefix } from './decorators';
import { ApplicationInterface } from './applicationInterface';

// base libraries
export { express };

// Middleware
export { jwtAuth } from './middleware/jwtAuth';

// Interfaces
export { IAppConfig, IEndpointConfig } from './interfaces';

export {
	// expressApp Interface
	ApplicationInterface,
	ApplicationInterface as AppInterface,
	ApplicationInterface as ExpressAppInterface,

	// decorators
	expressRouter, endpoint, config, final, prefix,
	expressRouter as RestHandler,
	endpoint as Route,
	endpoint as Endpoint,
	config as Config,
	final as Final,
	prefix as Prefix,
};
