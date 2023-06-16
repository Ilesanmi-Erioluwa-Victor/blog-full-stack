import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const generateToken = (id: string) => {
  if (!process.env.JWT_KEY)
    throw new Error('JWT_KEY is required in environment');
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '30d' });
};

export default generateToken;
