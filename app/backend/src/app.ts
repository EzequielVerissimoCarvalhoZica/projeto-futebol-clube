import * as express from 'express';
// import 'express-async-errors';
import { RouteLogin } from './route';
import { error } from './middleware';

class App {
  public app: express.Express;

  RouteLogin = new RouteLogin();

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
    // this.app.use('/login', this.RouteLogin.router);
    this.app.use(error);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
