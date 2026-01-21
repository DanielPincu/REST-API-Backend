import express, { Application, Request, Response } from 'express';
import dotenfFlow from 'dotenv-flow';
import routes from './routes';

// Load environment variables from .env files
//dotenfFlow.config();

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use imported routes
app.use('/', routes);



export function startServer() {
    app.listen(4000, function(){
        console.log("Server is running on port: " + 4000);
    })
}