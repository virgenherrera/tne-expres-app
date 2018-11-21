import { TneLogger } from '@tne/nodejs-app';
import * as successDto from '../entity/successDto';
import { ISuccessDto } from '../interface';
import { appThrowable } from './appThrowable';
import { IGetWithPaging } from '../interface/IGetWithPaging';

export function restSuccessDto(resType: string, data: IGetWithPaging | any, logger: TneLogger): ISuccessDto {
	const type = resType.toUpperCase();
	let dto: ISuccessDto;

	switch (type) {
		case 'GET':
			dto = new successDto.GET(data);
			break;
		case 'PUT':
			dto = new successDto.PUT(data);
			break;
		case 'DELETE':
			dto = new successDto.DELETE(data);
			break;
		case 'POST':
			dto = new successDto.POST(data);
			break;
		case 'HTTP204':
			dto = new successDto.Http204();
			break;
		case '204':
			dto = new successDto.Http204();
			break;
		case 'NO_CONTENT':
			dto = new successDto.Http204();
			break;

		default:
			return appThrowable(
				'successRestDtoInvalidResType',
				{ ':resType': resType },
				null,
				logger
			);
	}

	return dto;
}
