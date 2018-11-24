import { IRequest, IResponse } from '../interface';
import { NextFunction } from 'express';
import { restSuccessDto } from '../lib/restSuccessDto';
import { restErrorDto } from '../lib/restErrorDto';

export function dtoJsonResponses(req: IRequest, res: IResponse, next: NextFunction) {
	const { logger } = req;

	// append successJson helper to response Object
	res.successJson = function successJson(resType, data) {
		const dto = restSuccessDto(resType, data, logger);

		return res.status(dto.status).json(dto).end();
	};

	// append errorJson helper to response Object
	res.errorJson = function errorJson(E) {
		const dto = restErrorDto(E);

		return res.status(dto.status).json(dto).end();
	};

	return next();
}
