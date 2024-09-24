import express, { NextFunction, Request, Response} from 'express';
import {router} from './routers/router'

const app = express();

app.use(express.json());

app.use((err:any, req:Request, res:Response, next: NextFunction) => {
    res.status(404).send(
        {
            messase: "Erro desconhecido"
        }
    )
});

app.use('/notify', router);
app.use('/*', (req: Request, res: Response) => {res.status(200).send({message: "router not exists"})});


const PORT:number = 8090;
const HOST:string = "0.0.0.0" 

app.listen(PORT, HOST, async () => {
    console.log(`Listening in url local: http://127.0.0.1:${PORT} and http://0.0.0.0:${PORT}`);
});

