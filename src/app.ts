import express, { Application, Request, Response } from 'express';
import dotenfFlow from 'dotenv-flow';
import routes from './routes';
import { connect } from './repository/database';

// Load environment variables from .env files
dotenfFlow.config();

const app: Application = express();

export function startServer() {

    app.use(express.json());
    
    app.use('/api', routes);

    connect();

    const PORT: number = parseInt(process.env.PORT as string);
    app.listen(process.env.PORT, function(){
        console.log("Server is running on port: " + process.env.PORT);
    })
}
