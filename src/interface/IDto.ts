import { Paging } from '../entity/paging';

export interface IErrorDto {
	readonly status: number;
	success: boolean;
	message: string;
	errors?: Error[];
}

export interface ISuccessDto<T = any> {
	readonly status: number;
	success?: boolean;
	message?: string;
	data?: T | T[];
	paging?: Paging;
}

export interface IPagedDto<T = any> {
	uri: string;
	rows: T[];
	count: number;
	page: number;
	per_page: number;
	queryStringArgs?: any;
}
