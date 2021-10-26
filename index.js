import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import getRoutes from './routes/gets.js';

dotenv.config();

const app = express();

app.use('/gets', getRoutes);

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