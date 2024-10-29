import express, {Request, Response} from 'express';
import {authenticatedRouter} from "@/utils/authenticatedRouter";
import jwt from 'jsonwebtoken';

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

router.post('/logout-user', async(req: Request, res: Response) => {
    await new UserController().logoutUser(req, res);
});


router.post('/list-users', authenticatedRouter, async(req: Request, res: Response) => {
    await new UserController().listUsers(req, res);
});


router.post('/authenticate-test',  authenticatedRouter, async(req: Request, res: Response) => {
    res.status(200).send({message: "Rota acessivel coockie set",});
});


export {router};