const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("MongoDB Connection Successful."))
    .catch((e) => {
        console.log(e);
    });

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend is running.");
});