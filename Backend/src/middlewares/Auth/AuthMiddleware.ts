import { Request } from 'express';
import dotenv from 'dotenv';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

dotenv.config();

interface CustomRequest extends Request {
  AuthId?: string;
}

export const AuthMiddleWare = expressAsyncHandler(async (req: CustomRequest, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req?.headers?.authorization.startsWith('Bearer')
    ) {
      token = req?.headers?.authorization.split(' ')[1];
      if (!process.env.JWT_KEY) {
        throw new Error('SERVER JWT PASSWORD NOT SET');
      }
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY) as {
          id: string;
        };
        req.AuthId = decoded.id;
        console.log(req?.AuthId);
        next();
      } else {
        throw new Error('Error verifying JWT');
      }
    } else {
      throw new Error(
        `Sorry, there is no token attached to your Header, try again by attaching Token..`
      );
    }
    next();
  } catch (error) {
    throw new Error('Sorry No token attached');
  }
});
