import { NextFunction, Request, Response } from 'express';
import { HttpErrorStatusCode } from '../helper';
import AuthService from '../service/AuthService';

export default class ControllerLogin {
  private _AuthService = new AuthService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const result = await this._AuthService.auth(email, password);

    if (!result) return next(new HttpErrorStatusCode('Incorrect email or password', 401));

    return res.status(200).json(result);
  };

  validate = (req: Request, res: Response) => res.status(200).send(req.role);
}
