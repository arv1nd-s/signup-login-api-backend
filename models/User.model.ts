import mongoose from 'mongoose';

// Create a User model
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

export default User;