import express, { NextFunction, Request, Response} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import  http from 'http';

import {router} from './routers/router'
import { initializeSocketIO } from './utils/socketIO';
import path from 'path';
import { configAPI } from './config';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: configAPI.validAddress, 
    credentials: true
}));


app.use('/picturesWb', express.static(path.join(__dirname, 'picturesWb')));

app.use((err:any, req:Request, res:Response, next: NextFunction) => {
    res.status(404).send(
        {
            messase: "Erro desconhecido"
        }
    )
});


app.use('/notify', router);
app.use('/*', (req: Request, res: Response) => {res.status(200).send({message: "router not exists"})});


const PORT:number = parseInt(configAPI.port);
const HOST:string = configAPI.publicHost;
const server = http.createServer(app);

initializeSocketIO(server, app);


server.listen(PORT, HOST, async () => {
    console.log(`Listening in url local: http://${configAPI.localHost}:${PORT} and http://${configAPI.publicHost}:${PORT}`);
});

