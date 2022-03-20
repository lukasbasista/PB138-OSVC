import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes/routes';
import db from './controllers/dbController';
import mockData from '../db/mock/initData';

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeRoutes();
    this.initializeMiddleware();
    this.initializeDatabase();
  }

  private initializeDatabase() {
    db.push('/data', mockData, true);
  }

  private initializeRoutes() {
    this.app.use('/', routes);
  }

  private initializeMiddleware() {
    this.app.use(morgan('tiny'));
    /*
     * Enable this after frontend app is ready
     * this.app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));
     */
    this.app.use(helmet());
  }

  public listen() {
    this.app.listen(this.port, () =>
      console.log(`🚀 Server ready at: http://localhost:${this.port}`, ' '),
    );
  }
}

export default App;
