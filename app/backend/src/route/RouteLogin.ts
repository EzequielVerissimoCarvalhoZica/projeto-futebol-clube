import * as express from 'express';
import { BadRequest } from '../helper/error';

interface Teste {
  intializeRoutes: () => void;
}

export default class RouteLogin implements Teste {
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes = () => {
    this.router
      .route('/')
      .post((req, res, next) => {
        const { email } = req.body;
        if (!email) return next(new BadRequest('email is required'));

        return res.send('tudo certo');
      });
  };
}
