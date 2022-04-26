import * as express from 'express';
import validateLogin from '../middleware/validateLogin';
import { ControllerLogin } from '../controller';
import Auth from '../middleware/Auth';

export default class RouteLogin {
  public router = express.Router();

  constructor(private _ControllerLogin: ControllerLogin, private _Auth: Auth) {
    this.intializeRoutes();
  }

  intializeRoutes = () => {
    this.router
      .route('/')
      .post(validateLogin, this._ControllerLogin.login);

    this.router
      .route('/validate')
      .get(this._Auth.auth, this._ControllerLogin.validate);
  };
}
