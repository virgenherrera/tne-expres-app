import * as errorDto from '../entity/errorDto';
import { IErrorDto } from '../interface';

export function restErrorDto(Exception: any): IErrorDto {
	let dto: IErrorDto;
	const { type = '500' } = Exception;

	switch (`${type}`) {
		case '400':
			dto = new errorDto.Error400(Exception);
			break;
		case '401':
			dto = new errorDto.Error401(Exception);
			break;
		case '403':
			dto = new errorDto.Error403(Exception);
			break;
		case '404':
			dto = new errorDto.Error404(Exception);
			break;
		case '406':
			dto = new errorDto.Error406(Exception);
			break;
		case '500':
			dto = new errorDto.Error500(Exception);
			break;
	}

	return dto;
}
