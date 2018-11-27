import * as joi from 'joi';
import { NextFunction } from 'express';
import { IRequest, IResponse } from '../interface';
import { pager as pagerValidator } from '../validation/pager';
import { PAGE, PER_PAGE } from '../constant/config';
import { Pager } from '../entity/pager';

export function publishPager(getConfig: Function) {
	return function pager(req: IRequest, res: IResponse, next: NextFunction) {
		Object.defineProperty(req, 'pager', {
			get: (): Pager => {
				const page = req.query.page || req.body.page || req.headers['page'] || getConfig('defaultPage', PAGE);
				const per_page = req.query.per_page || req.body.per_page || req.headers['per_page'] || getConfig('defaultPerPage', PER_PAGE);
				const validationOpts: joi.ValidationOptions = { abortEarly: false, convert: true, };
				const { error, value } = joi.validate<Pager>({ page, per_page }, pagerValidator(PAGE, PER_PAGE), validationOpts);

				if (error) {
					const dto = { type: 400, message: error.message, errors: error.details };

					throw res.errorJson(dto);
				} else {
					return new Pager(value);
				}
			},
		});

		return next();
	};
}
