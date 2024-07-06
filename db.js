// backend/db.js
const { MongoClient } = require('mongodb');
const uri = "your-mongodb-uri";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}

connectDB();

module.exports = client;
