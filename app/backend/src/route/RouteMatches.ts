import * as express from 'express';
import { Auth } from '../middleware';
import { ControllerMatches } from '../controller';

export default class RouteMatches {
  public router = express.Router();

  constructor(private _ControllerMatches: ControllerMatches, private _Auth: Auth) {
    this.intializeRoutes();
  }

  intializeRoutes = () => {
    this.router
      .route('/')
      .get(this._ControllerMatches.findAll)
      .post(this._Auth.auth, this._ControllerMatches.create);

    this.router
      .route('/:id/finish')
      .patch(this._ControllerMatches.finishMatch);
  };
}
