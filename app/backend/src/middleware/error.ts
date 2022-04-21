import { ErrorRequestHandler } from 'express';
import HttpException from '../helper/error/HttpException';

const error: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof HttpException) {
    const { httpCode, message } = err;

    return res.status(httpCode).json({ message });
  }

  return res.status(500).json({ message: err.message });
};

export default error;
