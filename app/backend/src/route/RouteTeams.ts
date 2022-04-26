import * as express from 'express';
import { ControllerTeams } from '../controller';

export default class RouteTeams {
  public router = express.Router();

  constructor(private _ControllerTeams: ControllerTeams) {
    this.intializeRoutes();
  }

  intializeRoutes = () => {
    this.router
      .route('/')
      .get(this._ControllerTeams.findAll);

    this.router
      .route('/:id')
      .get(this._ControllerTeams.findOne);
  };
}
