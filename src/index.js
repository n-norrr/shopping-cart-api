const express = require('express');
const user = require('./routes/user.js');
const dotenv = require('dotenv').config();
const db = require('./db.js');
const app = express();

app.use(express.json());
app.use('/api', user);

if (process.env.NODE_ENV !== 'test') {
    db.connect(process.env.DB_URI);
}

const server = app.listen(process.env.PORT || 5000, () => {
    console.log("Express Server now listening on port: " + server.address().port);
});

const graceful_exit = () => {
    console.info(' SIGINT signal received.');
    db.disconnect();
    server.close();
}

server.on('close', () => {
    console.log("Express Server Disconnected.")
})

process.on('SIGINT', graceful_exit);

module.exports = server;