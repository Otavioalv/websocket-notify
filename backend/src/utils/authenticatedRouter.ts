import { Request, Response, NextFunction } from "express";
import { getPayload, getTokenCookie } from "./tokenUtils";
import { payloadTokenInterface } from "@/interfaces/userInterface";
import { successResponse } from "./response";
import { responseMessages } from "./responseMessages";

async function authenticatedRouter (req: Request, res: Response, next: NextFunction) {
    try {
        const token = await getTokenCookie(req);
	
        // Verifica se foi fornecido o token
        if(!token || !token.replace("Bearer ", "")) {
            return res.status(403).send(successResponse(responseMessages.InaccessibleRoute));
            
        }

        // Pega payload
        const payload:payloadTokenInterface = await getPayload(token.replace("Bearer ", ""));
        
        // Criar um chave payload para ser usada globalmente sem a necessidade de extrair o token e depois gerar o payload
        req.body.payload = payload;
        return next();   
    } catch (e) {
        const error = e as Error;
        console.log(error.message);
        res.status(403).send(successResponse(responseMessages.UserAuthenticationProblem, [error.message]));
    }
}

export {authenticatedRouter}