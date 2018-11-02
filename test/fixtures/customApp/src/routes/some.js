const { Router } = require('express');
const router = Router();

module.exports = {
	default: router
		.get('/api/v1/some', (req, res) => res.status(200).json({ locals: req.app.locals, query: req.query }).end())
		.get('/api/v1/req_res', (req, res) => res.status(200).json({ reqRes: req.mapReqToObj('query,params,body,header') }).end()),
};
