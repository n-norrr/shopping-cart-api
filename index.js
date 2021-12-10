const express = require('express');
const user = require('./routes/user.js');
const dotenv = require('dotenv').config();
const db = require('./db.js');

const app = express();

app.use(express.json());
app.use('/api', user);

const server = app.listen(process.env.PORT || 5000, () => {
    console.log("Backend is running.");
});

module.exports = server;