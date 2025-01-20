import express, { NextFunction, Request, Response} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import  http from 'http';

import {router} from './routers/router'
import {routerTest} from './routers/router.test'
import { initializeSocketIO } from './utils/socketIO';
import path from 'path';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:8080", "http://192.168.1.115:3000", "http://192.168.1.5:3000", "http://127.0.0.1:3000", "http://192.168.1.4:3000"], 
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
app.use('/test', routerTest);
app.use('/*', (req: Request, res: Response) => {res.status(200).send({message: "router not exists"})});


const PORT:number = 8090;
const HOST:string = "0.0.0.0";
const server = http.createServer(app);

initializeSocketIO(server, app);


server.listen(PORT, HOST, async () => {
    console.log(`Listening in url local: http://127.0.0.1:${PORT} and http://0.0.0.0:${PORT}`);
});

