import { Request, Response, NextFunction } from "express";
import { getPayload } from "./tokenUtils";

async function authenticatedRouter (req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;

        // Verifica se foi fornecido o token
        if(!token || !token.replace("Bearer ", "")) {
            res.status(403).send({message: "Rota inacessivel"});
            console.log("Rota inavessivel");
            return;
        }

        // Verifica se o token e valido
        // Pega payload
        const payload = await getPayload(token);
    
        return next();   
    } catch (e) {
        const error = e as Error;
        console.log(error.message);
        res.status(403).send({message: "Voce não tem autorização para acessar esse conteudo", errors: [error.message]});
    }
}

export {authenticatedRouter}