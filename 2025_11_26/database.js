const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = 'blog';

let client;
let db;

const connectToDatabase = async () => {
    if (db) {
        return db;
    }

    try {
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db(DB_NAME);
        console.log('Połączono z MongoDB');
        return db;
    } catch (error) {
        console.error('Błąd połączenia z MongoDB:', error);
        throw error;
    }
};

const getDatabase = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db;
};

const closeDatabase = async () => {
    if (client) {
        await client.close();
        console.log('Połączenie z MongoDB zamknięte');
    }
};

module.exports = {
    connectToDatabase,
    getDatabase,
    closeDatabase
};