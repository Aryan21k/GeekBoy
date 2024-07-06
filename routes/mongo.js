// routes/mongo.js

const { MongoClient } = require('mongodb');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB URI
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error.message || error.stack);
    }
}

// Function to insert data into MongoDB
async function insertData(collectionName, data) {
    const db = client.db('mydatabase'); // Replace with your database name
    const collection = db.collection(collectionName);

    try {
        const result = await collection.insertOne(data);
        console.log('Data inserted into MongoDB:', result.ops[0]);
        return result.ops[0]; // Return the inserted document
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        throw error; // Throw error for handling in calling function
    }
}

module.exports = {
    connectMongoDB,
    insertData
};
