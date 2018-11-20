export interface IErrorDto {
	readonly status: number;
	success: boolean;
	message: string;
	errors?: Error[];
}
