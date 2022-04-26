import * as express from 'express';
import { ControllerMatches } from '../controller';

export default class RouteMatches {
  public router = express.Router();

  constructor(private _ControllerMatches: ControllerMatches) {
    this.intializeRoutes();
  }

  intializeRoutes = () => {
    this.router
      .route('/')
      .get(this._ControllerMatches.findAll);
  };
}
