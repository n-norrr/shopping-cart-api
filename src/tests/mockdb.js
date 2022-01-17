const db = require('../db.js');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

const start = async () => {
    await mongod.start();
    const uri = mongod.getUri();
    await db.connect(uri);
}

const clear = async () => {
    const collections = db.get_collections();

    for (const key in collections) {
        await collections[key].deleteMany();
    }
}

const close = async () => {
    await db.drop_db();
    await db.disconnect();
    await mongod.stop();
}

module.exports = { start, clear, close }