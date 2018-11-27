const { Router } = require('express');
const router = Router();

module.exports = {
	default: router
		.get('/api/v1/error_400', (req, res) => res.errorJson({ type: 400 }))
		.get('/api/v1/error_401', (req, res) => res.errorJson({ type: 401, msg: 'unauthorized' }))
		.get('/api/v1/error_403', (req, res) => res.errorJson({ type: 403, message: 'Failed Auth' }))
		.get('/api/v1/error_404', (req, res) => res.errorJson({ type: 404 }))
		.get('/api/v1/error_406', (req, res) => res.errorJson({ type: 406 }))
		.get('/api/v1/error_500', (req, res) => res.errorJson({ type: 500, message: 'lorem ipsum' }))
		.get('/api/v1/wrong_verb', (req, res) => {
			try {
				return res.successJson('non_existent_veb', { a: 'b' })
			} catch (E) {
				return res.errorJson(E)
			}
		}),
};
