import { Request } from 'express';

export function mapReqToObj(requestedArgs: string | string[], req: Request): any {
	const argsArr = (typeof requestedArgs === 'string') ? requestedArgs.split(',') : requestedArgs;
	const reqParamsArr = argsArr.map((key) => (typeof req[key] === 'object') ? req[key] : { [key]: req[key] });

	// append auth data if exists
	if (req.hasOwnProperty('authorization')) {
		reqParamsArr.push(req['authorization']);
	}

	return Object.assign({}, ...reqParamsArr);
}

export function mapReqToObjMiddleware(...args) {
	const [req, , next] = args;

	// Append mapReqToObj function to request Object
	req['mapReqToObj'] = (paramString: string | string[]) => mapReqToObj(paramString, req);

	return next();
}
