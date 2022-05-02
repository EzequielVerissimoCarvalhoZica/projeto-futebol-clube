import * as express from 'express';
import { ControllerLeaderBoard } from '../controller';

export default class RouteLeaderBoard {
  public router = express.Router();

  constructor(private _ControllerLeaderBoard: ControllerLeaderBoard) {
    this.intializeRoutes();
  }

  intializeRoutes = () => {
    this.router
      .route('/home')
      .get(this._ControllerLeaderBoard.home);

    this.router
      .route('/away')
      .get(this._ControllerLeaderBoard.away);
  };
}
