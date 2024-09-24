import { UserController } from '@/controller/UserController';
import express, {Request, Response} from 'express';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    res.status(200).send({message: "router finded"});
});

router.post('/create-user', async (req: Request, res: Response) => {
    await new UserController().createUser(req, res);
})

export {router};