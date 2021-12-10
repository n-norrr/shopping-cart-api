const mongoose = require('mongoose');

const connect = async (uri, opts) => {
    try {
        await mongoose.connect(uri, opts);
        console.log("MongoDB Connection Successful.");
        return (process.env.NODE_ENV === 'test') ? mongoose.connection : null;
    } catch (e) {
        console.log(e);
    }
}

if (process.env.NODE_ENV !== 'test') {
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    connect(process.env.DB_URI, opts);
}

module.exports = { connect };