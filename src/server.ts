import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import indexRouter from './Routes/index';
import * as swaggerDocument from './swagger.json';
import cors from 'cors';
import bodyParser from 'body-parser';
import { User } from './models/User';

class Server {

    private app: Application;
    private port: string;
    private users: any;

    constructor() {
        this.app = express();
        this.port = '5000';
        this.users = indexRouter;
        this.listen();
        this.routes();
    }

    listen() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        this.app.listen(this.port, () => {
            return console.log(`Express is listening at http://localhost:${this.port}`);
        });
    }

    routes() {
        // Route main
        this.app.get('/', (req, res) => {
            res.send('Hello Swagger 2 !');
        });

        this.app.use('/', indexRouter);
    }
}

export default Server;