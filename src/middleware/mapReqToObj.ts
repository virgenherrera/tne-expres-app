import { Exceptions } from '../constant/Exceptions';

export function mapReqToObjMiddleware(...middlewareArgs) {
	const [req, , next] = middlewareArgs;

	// Append mapReqToObj function to request Object
	req.mapReqToObj = function mapReqToObj(...reqKeys: string[]): any {
		const data: any = {};

		// append auth data if exists
		if (req.hasOwnProperty('authorization')) {
			data.authorization = req.authorization;
		}

		return reqKeys.reduce((acc, key) => {
			if (!req.hasOwnProperty(key)) {
				throw { type: 500, message: Exceptions.mapReqToObjNoProp.replace(':key', key) };
			}

			const reqProp = (typeof req[key] === 'object') ? req[key] : { [key]: req[key] };

			return Object.assign(acc, reqProp);
		}, data);
	};

	return next();
}
