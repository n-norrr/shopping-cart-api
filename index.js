const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const user = require('./routes/user.js');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', user);

mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log("Backend is running.");
        });

        console.log("MongoDB Connection Successful.")
    })
    .catch((e) => {
        console.log(e);
    });