import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { jwtSecret } from '../config/config';

const refreshToken = (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
  
      // Verify the refresh token
      jwt.verify(refreshToken, jwtSecret, (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid refresh token' });
        }
  
        // Generate a new access token which ill expire after 120s
        const accessToken = jwt.sign({ email: decoded.email }, jwtSecret, {
          expiresIn: '120s',
        });
        
        // Return newly generated accessToken
        res.json({ accessToken });
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
};

export default refreshToken;