const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const postSingle = async (req, res) => {
    const quote = {
        quote: req.body.quote,
        character: req.body.character
    };
    const result = await mongodb.getDb().db().collection('quotes').insertOne(quote);
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ message: 'Error occurred while inserting the quote' });
    }
};

module.exports = { postSingle};