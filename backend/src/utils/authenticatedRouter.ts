import { Request, Response, NextFunction } from "express";
import { getPayload, getTokenCookie } from "./tokenUtils";
import { payloadTokenInterface } from "@/interfaces/userInterface";

async function authenticatedRouter (req: Request, res: Response, next: NextFunction) {
    try {
        const token = await getTokenCookie(req);
	
        // Verifica se foi fornecido o token
        if(!token || !token.replace("Bearer ", "")) {
            return res.status(403).send({message: "Rota inacessivel"});
        }

        // Pega payload
        const payload:payloadTokenInterface = await getPayload(token.replace("Bearer ", ""));
        
        // Criar um chave payload para ser usada globalmente sem a necessidade de extrair o token e depois gerar o payload
        req.body.payload = payload;
        return next();   
    } catch (e) {
        const error = e as Error;
        console.log(error.message);
        res.status(403).send({message: "Voce não tem autorização para acessar esse conteudo", errors: [error.message]});
    }
}

export {authenticatedRouter}