import { Request, Response, NextFunction } from 'express';
import { HttpErrorStatusCode, joiLogin } from '../helper';

export default (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const { error } = joiLogin.validate({ email, password });

  if (error) {
    const [code, message] = error.message.split('|');

    return next(new HttpErrorStatusCode(message, Number(code)));
  }

  return next();
};
