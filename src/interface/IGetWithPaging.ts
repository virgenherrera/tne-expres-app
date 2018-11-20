export interface IGetWithPaging {
	rows?: any[];
	uri?: string;
	count?: number;
	page?: number;
	per_page?: number;
	queryStringArgs?: any;
}
