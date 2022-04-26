import { Response, NextFunction } from 'express';
import { IRequest } from '../Interfaces';
import { AuthService } from '../service';

export default class Auth {
  constructor(private _AuthService: AuthService) {}

  auth = async (req: IRequest, res: Response, next: NextFunction) => {
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
