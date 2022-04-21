import { ErrorRequestHandler } from 'express';
import HttpError from '../helper/error/HttpError';

const error: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof HttpError) {
    const { httpCode, message } = err;
    console.log('feio');
    return res.status(httpCode).json({ message });
  }

  return res.status(500).json({ message: err.message });
};

export default error;
