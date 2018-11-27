import { NextFunction } from 'express';
import { getTokenFromRequest } from '../lib/getTokenFromRequest';
import { Authorization } from '../entity/authorization';
import { Error401 } from '../entity/errorDto';
import { IRequest, IResponse } from '../interface';

export function jwtAuth(tokenValidateFunction: (token: string) => Promise<Authorization>) {
	return async (req: IRequest, res: IResponse, next: NextFunction): Promise<any> => {
		try {
			const token = getTokenFromRequest(req);
			const data = await tokenValidateFunction(token);

			req.authorization = new Authorization(data);

			return next();
		} catch (E) {
			const err = new Error401(E);

			return res.status(err.status).json(err).end();
		}
	};
}
