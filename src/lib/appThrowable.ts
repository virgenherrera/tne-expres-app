import { Exceptions } from '../constant/Exceptions';
import { TneLogger } from '@tne/nodejs-app';

export function appThrowable(eItem: string, msgReplacers: any = {}, path: string = null, logger: TneLogger): never {
	let eItemMsg: string = null;
	let pathMsg: string = null;

	if (typeof eItem === 'string' && Exceptions.hasOwnProperty(eItem)) {
		eItemMsg = Exceptions[eItem];


		Object.keys(msgReplacers).forEach(key => {
			eItemMsg = eItemMsg.replace(key, `${msgReplacers[key]}`);
		});

		logger.error(eItemMsg);
	}

	if (path && typeof path === 'string') {
		pathMsg = Exceptions.appPathInterpolation.replace(':path', path);

		logger.error(pathMsg);
	}

	const errMsg = (eItemMsg && pathMsg) ? `${eItemMsg}|${pathMsg}` : eItemMsg;

	throw new Error(errMsg);
}
