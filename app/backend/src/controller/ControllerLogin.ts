import { NextFunction, Request, Response } from 'express';
import { HttpErrorStatusCode } from '../helper';
import AuthService from '../service/AuthService';

export default class ControllerLogin {
  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const result = await AuthService.auth(email, password);

    if (!result) return next(new HttpErrorStatusCode('Error Login: email or password wrong'));

    return res.status(200).json(result);
  };
}
