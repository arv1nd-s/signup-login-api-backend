import bcrypt from 'bcrypt';
import User from '../models/User.model';
import { Request, Response } from 'express';

const signup = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
  
      // Hash user posted password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
};

export default signup;