const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;  // Use the MongoDB URI from .env file
const dbName = 'eventDB';  // This can be modified based on your requirements

const client = new MongoClient(url);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = { connectDB };
