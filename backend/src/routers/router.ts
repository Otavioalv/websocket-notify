import express, {Request, Response} from 'express';
import {authenticatedRouter} from "@/utils/authenticatedRouter";

import { UserController } from '@/controller/UserController';



const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    res.status(200).send({message: "router finded"});
});

router.post('/create-user', async (req: Request, res: Response) => {
    await new UserController().createUser(req, res);
})

router.post('/login-user', async (req: Request, res: Response) => {
    await new UserController().loginUser(req, res);
})


router.post('/authenticate-cookie', async (req: Request, res: Response) => {
    const cookies = await req.cookies.access_token;
    console.log("Cookies: ", cookies);
    res.status(200).send({message: cookies});
})

router.post('/authenticate-test',  authenticatedRouter, async(req: Request, res: Response) => {
    res.cookie('test', {name: "otavio", id: 23, text: "Teste de cookie??"});
    res.status(200).send({message: "Rota acessivel coockie set"});
});

export {router};