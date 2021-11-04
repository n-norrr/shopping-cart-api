const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const user = require('./routes/user.js');

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use('/api', user);

if (require.main === module) {
    mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("MongoDB Connection Successful.")
    })
    .catch((e) => {
        console.log(e);
    });
}

const server = app.listen(process.env.PORT || 5000, () => {
    console.log("Backend is running.");
});

module.exports = server;