import express from 'express';
import { serverPort } from './config/config';

const app = express();

// Start the server
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
})