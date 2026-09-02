const express = require('express');
const router = express.Router();
const quotesController = require('../controllers/quotes');

router.post('/', quotesController.postSingle);

module.exports = router;