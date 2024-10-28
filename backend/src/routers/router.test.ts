import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const routerTest = express.Router();

const JWT_SECRET = 'secreta';


routerTest.post('/login', (req:Request, res:Response) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Nome de usuário é necessário' });
    }
    
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

    // Salvando o token no cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Defina como 'true' em produção
        maxAge: 3600000, // 1 hora
    });

    res.status(200).json({ message: 'Login bem-sucedido!' });

});


routerTest.get('/protected', (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ message: 'Acesso permitido', user: decoded });
    } catch (error) {
        res.status(403).json({ message: 'Token inválido' });
    }
});

routerTest.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false // Defina como 'true' em produção
    });
    res.status(200).json({ message: 'Logout bem-sucedido, cookie deletado!' });
});

export {routerTest};