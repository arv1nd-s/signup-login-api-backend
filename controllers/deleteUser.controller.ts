import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { Request, Response } from 'express';
import { jwtSecret } from '../config/config';

// Delete user for which we've received access token
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { accessToken } = req.body;

        // Verify the access token
        jwt.verify(accessToken, jwtSecret, async (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid access token' });
            }
            // Extract email from the decoded token
            const email = decoded.email;

            // Delete the user
            await User.deleteOne({ email });

            res.json({ message: 'User deleted' });
        });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
};

export default deleteUser;