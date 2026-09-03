const express = require('express');
const router = express.Router();
const quotesController = require('../controllers/quotes');

// Render home page with quotes list
router.get('/', quotesController.renderIndex);

// Attach quotes routes (e.g., POST /quotes)
router.use('/quotes', require('./quotes'));

module.exports = router;
