import { Request, Response, NextFunction } from 'express';
import { getTokenFromRequest } from '../lib/getTokenFromRequest';
import { Authorization } from '../entity/authorization';
import { Error401 } from '../entity/error401';

export function jwtAuth(tokenValidateFunction: (token: string) => Promise<Authorization>) {
	return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		try {
			const token = getTokenFromRequest(req);
			const data = await tokenValidateFunction(token);

			req['authorization'] = new Authorization(data);
			req['auth'] = req['authorization'];

			return next();
		} catch (E) {
			const err = new Error401(E);

			return res.status(err.status).json(err).end();
		}
	};
}
