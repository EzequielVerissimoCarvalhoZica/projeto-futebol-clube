import * as express from 'express';
import 'express-async-errors';
import { RouteLogin, RouteMatches, RouteTeams, RouteLeaderBoard } from './route';
import { Auth, error } from './middleware';
import {
  ControllerLeaderBoard,
  ControllerLogin,
  ControllerMatches,
  ControllerTeams,
} from './controller';
import { AuthService, ServiceTeams } from './service';

class App {
  public app: express.Express;

  private _authService = new AuthService();

  private _auth = new Auth(this._authService);

  private _controllerLogin = new ControllerLogin(this._authService);

  private _routeLogin = new RouteLogin(this._controllerLogin, this._auth);

  private _serviceTeams = new ServiceTeams();

  private _controllerTeams = new ControllerTeams(this._serviceTeams);

  private _routeTeams = new RouteTeams(this._controllerTeams);

  private _controllerMatches = new ControllerMatches();

  private _routeMatches = new RouteMatches(this._controllerMatches, this._auth);

  private _controllerLeaderBoard = new ControllerLeaderBoard();

  private _routeLeaderBoard = new RouteLeaderBoard(this._controllerLeaderBoard);

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes() {
    this.app.use('/login', this._routeLogin.router);
    this.app.use('/teams', this._routeTeams.router);
    this.app.use('/matches', this._routeMatches.router);
    this.app.use('/leaderboard', this._routeLeaderBoard.router);
    this.app.use(error);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
