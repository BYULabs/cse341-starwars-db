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

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('quotes').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
}

module.exports = { postSingle, getAll};