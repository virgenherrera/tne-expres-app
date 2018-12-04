import { Paging } from '../entity/paging';

export interface IErrorDto {
	readonly status: number;
	success: boolean;
	message: string;
	errors?: Error[];
}

export interface ISuccessDto {
	readonly status: number;
	success?: boolean;
	message?: string;
	data?: any | any[];
	paging?: Paging;
}

export interface IPagedDto {
	uri?: string;
	rows?: any[];
	count?: number;
	page?: number;
	per_page?: number;
	queryStringArgs?: any;
}
