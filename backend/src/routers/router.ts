import express, {Request, Response} from 'express';
import {authenticatedRouter} from "@/utils/authenticatedRouter";
import multer from  'multer'; 
import path from 'path';

import { UserController } from '@/controller/UserController';



const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    res.status(200).send({message: "router finded"});
});

router.post('/create-user', async (req: Request, res: Response) => {
    await new UserController().createUser(req, res);
});

router.post('/login-user', async (req: Request, res: Response) => {
    await new UserController().loginUser(req, res);
});

router.post('/logout-user', async(req: Request, res: Response) => {
    await new UserController().logoutUser(req, res);
});

router.post('/list-users', authenticatedRouter, async(req: Request, res: Response) => {
    await new UserController().listUsers(req, res);
});

router.post('/list-menssages/:userId', authenticatedRouter, async(req: Request, res: Response) => {
    await new UserController().listMenssages(req, res);
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/picturesWb'); 
    }, 
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        
        cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
    },
});

const upload = multer({storage});
// função upload.single('image') -> zera o REQUEST
router.post('/upload-picture',  upload.single('image'), authenticatedRouter, async(req: Request, res: Response) => {
    await new UserController().uploadPicture(req, res);
})

export {router};