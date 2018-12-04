export interface IPagingConfig {
	uri: string;
	count: number;
	page: number;
	per_page: number;
	queryStringArgs?: any;
}

export interface IAuthorization {
	token: string;
	decodedToken: any;
	user: any;
}


export { IAppSettings, IEndpointSettings } from './IAppSettings';
export { IErrorDto, ISuccessDto, IPagedDto } from './IDto';
export { IRequest } from './IRequest';
export { IResponse } from './IResponse';
