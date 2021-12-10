const db = require('../db.js');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();
let connection;

module.exports.start = async () => {
    await mongod.start();
    const uri = mongod.getUri();

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    connection = await db.connect(uri, opts);
}

module.exports.clear = async() => {
    const collections = connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany();
    }
}

module.exports.close = async () => {
    await connection.dropDatabase();
    await connection.close();
    await mongod.stop();
}