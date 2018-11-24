import { IRequest, IResponse } from '../interface';

export function notFound(req: IRequest, res: IResponse) {
	const type = 404;
	const message = `Not-existent Endpoint '${req.url}' for Method: '${req.method}'`;

	// return the error JSON Object
	return res.errorJson({ type, message });
}
