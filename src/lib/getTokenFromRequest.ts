import { Request } from 'express';
import { lookupKeysObjects, lookupKeys } from '../constant/tokenKeys';

export function getTokenFromRequest(req: Request): string {
	const bRegExp = new RegExp('Bearer ', 'g');
	const rawToken = lookupKeysObjects.reduce((acc, k1) => {
		if (acc || !req.hasOwnProperty(k1)) { return acc; }

		const k2 = lookupKeys.find(k => (req[k1].hasOwnProperty(k) && typeof req[k1][k] === 'string'));

		if (k2) {
			acc = req[k1][k2];
		}

		return acc;
	}, null);

	return (!rawToken) ? rawToken : rawToken.replace(bRegExp, '');
}



