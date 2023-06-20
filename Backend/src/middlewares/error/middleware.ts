import { RequestHandler, Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validation';
import { requestError } from '../../types/error-interfaces';
// NotFoundError
const errorHandler = (
  error: requestError | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = error.message || 'encounter error';
  const status = error.statusCode || 500;
  console.log('Error message', message);

  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json(error);
  } else {
    res.status(status).json({
      message,
      error: 'Error message',
    });
  }

  next();
};

export default errorHandler;
