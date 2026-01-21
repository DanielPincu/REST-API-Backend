import express, { Application, Request, Response } from 'express';
import dotenfFlow from 'dotenv-flow';
import routes from './routes';

// Load environment variables from .env files
dotenfFlow.config();

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use imported routes
app.use('/', routes);



export function startServer() {
    const PORT: number = parseInt(process.env.PORT as string);
    app.listen(process.env.PORT, function(){
        console.log("Server is running on port: " + process.env.PORT);
    })
}