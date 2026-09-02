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

const updateQuote = async (req, res) => {
    try {
        const filter = { character: 'Yoda' };
        const update = {
            $set: {
                character: req.body.name,
                quote: req.body.quote
            }
        };

        const result = await mongodb.getDb().db().collection('quotes').findOneAndUpdate(
            filter, 
            update, 
            { returnDocument: 'after' }
        );

        if (result) {
            res.json('Success');
        } else {
            res.status(404).json('No quote found to update');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating quote', error });
    }
};

const deleteQuote = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('quotes').deleteOne({ character: 'Darth Vader' });

        if (result.deletedCount === 0) {
            return res.json('No Darth Vader quote to delete');
        }
        res.json("Deleted Darth Vader's quote");
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quote', error });
    }
};

module.exports = { renderIndex, postSingle, updateQuote, deleteQuote };
