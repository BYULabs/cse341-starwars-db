const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

router.use('/quotes', require('./quotes'));

module.exports = router;