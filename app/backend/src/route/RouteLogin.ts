import * as express from 'express';
import validateLogin from '../middleware/validateLogin';
import { ControllerLogin } from '../controller';

interface Teste {
  intializeRoutes: () => void;
}

export default class RouteLogin implements Teste {
  public router = express.Router();

  ControllerLogin = new ControllerLogin();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes = () => {
    this.router
      .route('/')
      .post(validateLogin, this.ControllerLogin.login);
  };
}
