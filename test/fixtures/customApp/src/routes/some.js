const { Router } = require('express');
const router = Router();

module.exports = {
	default: router
		.get('/api/v1/some', (req, res) => res.status(200).json({ locals: req.app.locals, query: req.query }).end())
		.get('/api/v1/success_mapReqToObj', (req, res) => res.status(200).json({ reqRes: req.mapReqToObj('query', 'params', 'body') }).end())
		.get('/api/v1/error_mapReqToObj', (req, res) => {
			try {
				const data = req.mapReqToObj('body', 'non_existent_prop');

				return res.successJson(data);
			} catch (E) {
				return res.errorJson(E);
			}
		}),
};
