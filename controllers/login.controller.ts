import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { Request, Response } from 'express';
import { jwtSecret } from '../config/config';

const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Verify the password
      const passwordMatch = await bcrypt.compare(password, user.password!);   // non-null assertion operator
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate access and refresh tokens
      const accessToken = jwt.sign({ email }, jwtSecret, { expiresIn: '120s' });
      const refreshToken = jwt.sign({ email }, jwtSecret);
  
      res.json({ accessToken, refreshToken });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
};

export default login;