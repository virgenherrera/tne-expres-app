import { Response } from 'express';
import { IPagedDto } from './IDto';

export type ResType =
	'get' |
	'GET' |
	'post' |
	'POST' |
	'put' |
	'PUT' |
	'delete' |
	'DELETE' |
	'http204' |
	'HTTP204' |
	'204' |
	'no_content' |
	'NO_CONTENT'
	;

export interface IResponse extends Response {
	successJson(resType: ResType, data: IPagedDto | any): void;
	errorJson(E: Error | TypeError | any): void;
}


