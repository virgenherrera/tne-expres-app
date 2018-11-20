import { Paging } from '../entity/paging';

export interface ISuccessDto {
	readonly status: number;
	success?: boolean;
	message?: string;
	data?: any | any[];
	paging?: Paging;
}
