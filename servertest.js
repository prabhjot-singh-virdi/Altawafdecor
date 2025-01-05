const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

let db, cardsCollection;

// MongoDB Connection
MongoClient.connect(uri)
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
        cardsCollection = db.collection('cards');
    })
    .catch(err => console.error(err));

// API Routes
// Get all cards
app.get('/api/cards', async (req, res) => {
    const cards = await cardsCollection.find().toArray();
    res.json(cards);
});

// Add a new card
app.post('/api/cards', async (req, res) => {
    const card = req.body;
    await cardsCollection.insertOne(card);
    res.json({ message: 'Card added successfully!' });
});

// Delete a card
app.delete('/api/cards/:id', async (req, res) => {
    const id = req.params.id;
    await cardsCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Card deleted successfully!' });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
