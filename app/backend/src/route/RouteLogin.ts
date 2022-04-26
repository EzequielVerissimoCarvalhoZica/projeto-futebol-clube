import * as express from 'express';
import { validateLogin, Auth } from '../middleware';
import { ControllerLogin } from '../controller';

interface Teste {
  intializeRoutes: () => void;
}

export default class RouteLogin implements Teste {
  public router = express.Router();

  ControllerLogin = new ControllerLogin();

  Auth = new Auth();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes = () => {
    this.router
      .route('/')
      .post(validateLogin, this.ControllerLogin.login);

    this.router
      .route('/validate')
      .get(this.Auth.auth, this.ControllerLogin.validate);
  };
}
