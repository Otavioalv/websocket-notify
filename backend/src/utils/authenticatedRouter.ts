import { Request, Response, NextFunction } from "express";
import { getPayload } from "./tokenUtils";
import { payloadTokenInterface } from "@/interfaces/userInterface";

async function authenticatedRouter (req: Request, res: Response, next: NextFunction) {
    try {
        const token = await req.cookies.access_token;

        // Verifica se foi fornecido o token
        if(!token || !token.replace("Bearer ", "")) {
            console.log("Rota inavessivel");
            return res.status(403).send({message: "Rota inacessivel"});
        }

        // Pega payload
        const payload:payloadTokenInterface = await getPayload(token.replace("Bearer ", ""));
        
        req.body.payload = payload;

        return next();   
    } catch (e) {
        const error = e as Error;
        console.log(error.message);
        res.status(403).send({message: "Voce não tem autorização para acessar esse conteudo", errors: [error.message]});
    }
}

export {authenticatedRouter}