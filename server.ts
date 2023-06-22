import express from 'express';
import mongoose, { model } from 'mongoose';
import { serverPort, databaseUrl } from './config/config';
import signup from './controllers/signup.controller';
import login from './controllers/login.controller';
import refreshToken from './controllers/refreshToken.controller';
import deleteUser from './controllers/deleteUser.controller';

const app = express();
app.use(express.json());

// Create MongoDB connection
mongoose.connect(databaseUrl);

// Signup route
app.post('/signup', signup);

// Login route
app.post('/login', login);

// Refresh token route
app.post('/refresh-token', refreshToken);

// Delete user route
app.delete('/delete-user/', deleteUser);

// Start the server
app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
})