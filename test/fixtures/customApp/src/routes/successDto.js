const { Router } = require('express');
const router = Router();

const rows = [
	{ id: '5c581c5748fc8c35bd7f16eac9efbb55', name: 'tony', lastName: 'stark' },
	{ id: '5c581c5748fc8c35bd7f16eac9efbb56', name: 'peter', lastName: 'parker' },
	{ id: '5c581c5748fc8c35bd7f16eac9efbb57', name: 'miles', lastName: 'morales' },
	{ id: '5c581c5748fc8c35bd7f16eac9efbb58', name: 'peter', lastName: 'porker' },
	{ id: '5c581c5748fc8c35bd7f16eac9efbb59', name: 'bruce', lastName: 'wayne' },
	{ id: '5c581c5748fc8c35bd7f16eac9efbb60', name: 'bruce', lastName: 'banner' },
];

const pagedData = {
	rows,
	uri: '/',
	count: rows.length,
	page: 1,
	per_page: 3,
	queryStringArgs: { a: 'b', c: 'd', e: 'f' },
}

const data = {
	a: 'aa',
	b: 'bb',
	arr: [1, 2.3]
};

module.exports = {
	default: router
		.get('/api/v1/success_get', (req, res) => res.successJson('GET', data))
		.get('/api/v1/success_put', (req, res) => res.successJson('PUT', data))
		.get('/api/v1/success_delete', (req, res) => res.successJson('DELETE', data))
		.get('/api/v1/success_post', (req, res) => res.successJson('POST', data))
		.get('/api/v1/success_http204', (req, res) => res.successJson('HTTP204', data))
		.get('/api/v1/success_204', (req, res) => res.successJson('204', data))
		.get('/api/v1/success_no_content', (req, res) => res.successJson('NO_CONTENT', data))
		.get('/api/v1/success_with_paging', (req, res) => res.successJson('GET', pagedData)),
};
