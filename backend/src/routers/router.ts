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


router.post('/authenticate-cookie', async (req: Request, res: Response) => {
    const cookies = await req.cookies.access_token;
    console.log("Cookies: ", cookies);
    res.status(200).send({message: cookies});
})

router.post('/authenticate-test',  authenticatedRouter, async(req: Request, res: Response) => {
    res.cookie('test', {name: "otavio", id: 23, text: "Teste de cookie??"});
    res.status(200).send({message: "Rota acessivel coockie set"});
});







router.post('/login', async(req:Request, res:Response) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Nome de usuário é necessário' });
    }
    
    const token = jwt.sign({ username }, "JWT_SECRET", { expiresIn: '1h' });

    
    res.cookie('token', token, {
        httpOnly: true,
        secure: false, 
        maxAge: 3600000, 
    });

    res.status(200).json({ message: 'Login bem-sucedido!' });

});


router.get('/protected', (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }

    try {
        const decoded = jwt.verify(token, "JWT_SECRET");
        res.status(200).json({ message: 'Acesso permitido', user: decoded });
    } catch (error) {
        res.status(403).json({ message: 'Token inválido' });
    }
});

router.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false // Defina como 'true' em produção
    });
    res.status(200).json({ message: 'Logout bem-sucedido, cookie deletado!' });
});


export {router};