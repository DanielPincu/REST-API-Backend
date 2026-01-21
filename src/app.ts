import express, { Application, Request, Response } from 'express';
import dotenfFlow from 'dotenv-flow';

// Load environment variables from .env files
dotenfFlow.config();

const app: Application = express();

export function startServer() {
    app.listen(4000, function(){
        console.log("Server is running on port: " + 4000);
    })
}