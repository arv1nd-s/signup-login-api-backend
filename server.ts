import express from 'express';
import mongoose from 'mongoose';
import { serverPort } from './config/config';

const app = express();

// Create MongoDB connection
mongoose.connect('mongodb://localhost:27017/task1');


// Start the server
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
})