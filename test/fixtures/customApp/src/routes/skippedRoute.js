const { Router } = require('express');
const router = Router();

module.exports = router.get('/api/v1/some', (req, res) => res.status(200).json({ locals: req.app.locals, query: req.query }).end())
