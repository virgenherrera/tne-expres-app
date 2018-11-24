import * as joi from 'joi';

export function pager(page: number, per_page: number): joi.ObjectSchema {
	return joi.object().keys({
		page: joi.number().default(page).integer().positive().min(1).required(),
		per_page: joi.number().default(per_page).integer().positive().min(1).required(),
	});
}
