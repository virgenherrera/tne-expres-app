import { Request } from 'express';
import { Authorization } from '../entity/authorization';

export interface IRequest extends Request {
	logger: any;
	authorization: Authorization;
	mapReqToObj(paramString: string | string[]): any;
}
