import * as errorDto from '../entity/errorDto';
import { IErrorDto } from '../interfaces';

const allowedTypes = ['string', 'number'];

export function restErrorDto(Exception: any): IErrorDto {
	const { type } = Exception;

	if (type && allowedTypes.indexOf(typeof type) > -1) {
		if (['Error400', '400', 400].indexOf(type) > -1) { return new errorDto.Error400(Exception); }
		if (['Error401', '401', 401].indexOf(type) > -1) { return new errorDto.Error401(Exception); }
		if (['Error403', '403', 403].indexOf(type) > -1) { return new errorDto.Error403(Exception); }
		if (['Error404', '404', 404].indexOf(type) > -1) { return new errorDto.Error404(Exception); }
		if (['Error406', '406', 406].indexOf(type) > -1) { return new errorDto.Error406(Exception); }
		if (['Error500', '500', 500].indexOf(type) > -1) { return new errorDto.Error500; }

	} else {
		return new errorDto.Error500;
	}
}

export function successRestDto() { }







