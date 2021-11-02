const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
    await mongod.start();
    const uri = mongod.getUri();

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    await mongoose.connect(uri, opts);
}

module.exports.clear = async() => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany();
    }
}

module.exports.close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}