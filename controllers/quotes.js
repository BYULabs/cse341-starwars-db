const mongodb = require('../db/connect');

// Fetch all quotes and render index.ejs
const renderIndex = async (req, res) => {
    try {
        const quotes = await mongodb.getDb().db().collection('quotes').find().toArray();
        res.render('index', { 
            title: 'Star Wars Quote App',
            quotes: quotes 
        });
    } catch (error) {
        res.status(500).send('Error fetching quotes from database');
    }
};

// Insert quote and redirect to main page
const postSingle = async (req, res) => {
    const quote = {
        quote: req.body.quote,
        character: req.body.character
    };
    const result = await mongodb.getDb().db().collection('quotes').insertOne(quote);
    if (result.acknowledged) {
        res.redirect('/');
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
};

module.exports = { renderIndex, postSingle, getAll };