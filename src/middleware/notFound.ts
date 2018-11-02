import { Error404 } from '../entity/error404';

export function notFound(...args) {
	const [req, res] = args;
	const message = `Not-existent Endpoint '${req.url}' for Method: '${req.method}'`;
	const e404 = new Error404(message);

	// return the error JSON Object
	return res.status(e404.status).json(e404).end();
}
