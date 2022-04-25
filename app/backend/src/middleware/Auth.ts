import { Request, Response, NextFunction } from 'express';
import AuthService from '../service/AuthService';

export default class Auth {
  private _AuthService = new AuthService();

  auth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({ message: 'token not found' });

    const result = this._AuthService.verify(authorization);

    if (!result) {
      return res.status(401).json({ message: 'Unauthorized token' });
    }

    req.role = result;

    next();
  };
}