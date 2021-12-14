const db = require('../db.js');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

module.exports.start = async () => {
    await mongod.start();
    const uri = mongod.getUri();
    await db.connect(uri);
}

module.exports.clear = async () => {
    const collections = db.get_collections();

    for (const key in collections) {
        await collections[key].deleteMany();
    }
}

module.exports.close = async () => {
    await db.drop_db();
    await db.disconnect();
    await mongod.stop();
}