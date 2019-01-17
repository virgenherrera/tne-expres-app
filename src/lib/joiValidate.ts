import * as joi from 'joi';

const defaultOpts: joi.ValidationOptions = {
	abortEarly: false,
	convert: true,
};

export function joiValidate<T = any>(data: T, schema: joi.SchemaLike, opts: joi.ValidationOptions = defaultOpts): T {
	const { error, value } = joi.validate<T>(data, schema, opts);

	if (error) {
		throw { type: 400, message: error.message, errors: error.details };
	} else {
		return value;
	}
}
