const { Router } = require('express');
const router = Router();

const path = '/api/v1/pager_helper';
const handler = (req, res) => {
	const pager = req.mapReqToObj('pager');

	return res.status(200).json(Object.assign({}, pager)).end();
};

module.exports = {
	default: router
		.get(path, handler)
		.post(path, handler),
};
