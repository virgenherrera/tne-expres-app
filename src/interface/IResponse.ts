import { Response } from 'express';
import { IGetWithPaging } from './IGetWithPaging';

export interface IResponse extends Response {
	successJson(resType: 'get' | 'GET', data: IGetWithPaging | any): void;
	successJson(resType: 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE' | 'http204' | 'HTTP204' | '204' | 'no_content' | 'NO_CONTENT', data: any): void;
	errorJson(E: Error | TypeError | any): void;
}


