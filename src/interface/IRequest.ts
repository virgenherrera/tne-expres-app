import { Request } from 'express';
import { TneLogger } from '@tne/nodejs-app';
import { Authorization } from '../entity/authorization';

export interface IRequest extends Request {
	logger: TneLogger | Console;
	authorization: Authorization;
	mapReqToObj(...requestProperties: string[]): any;
}
