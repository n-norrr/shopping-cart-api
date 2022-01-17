const mongoose = require('mongoose');

let connection;

const connect = async (uri) => {
    try {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        await mongoose.connect(uri, opts);
        connection = mongoose.connection;
        console.log("MongoDB Connection Successful.");
    } catch (e) {
        console.log(e);
    }
}

const disconnect = async () => {
    try {
        await connection.close();
        console.log("MongoDB Connection Closed.")
    } catch (e) {
        console.log(e);
    }
}

const drop_db = async () => {
    try {
        await connection.dropDatabase();
        console.log("MongoDB Database Dropped.")
    } catch (e) {
        console.log(e);
    }
}

const get_collections = async () => {
    try {
        return connection.collections;
    } catch (e) {
        console.log(e);
    }
}

module.exports = { connect, get_collections, drop_db, disconnect };