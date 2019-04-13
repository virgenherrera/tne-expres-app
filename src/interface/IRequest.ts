import { Request } from 'express';
import { TneLogger } from '@tne/logger';
import { Authorization } from '../entity/authorization';
import { Pager } from '../entity/pager';

export interface IRequest extends Request {
	logger: TneLogger;
	pager: Pager;
	authorization: Authorization;
	mapReqToObj(...requestProperties: string[]): any;
}
