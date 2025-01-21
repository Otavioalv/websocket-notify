import { Express } from "express"
import { authJwt } from "@/config"
import { JwtPayload, sign, verify, VerifyErrors } from "jsonwebtoken"
import { Response, Request, CookieOptions } from "express"

import { payloadTokenInterface, userInterface } from "@/interfaces/userInterface"



export const genereteTokenUser = async (user: userInterface):Promise<string> => {
    try {
        const payload: payloadTokenInterface = {
            id: user.id_user, 
            name: user.name
        }

        const token:string = sign(payload, authJwt.secret);
  
        return token;
    } catch (e) {
        throw new Error("Erro ao gerar token");
    }
}

export const getPayload = async (token: string):Promise<payloadTokenInterface> => {
    try {    
        token = token.replace("Bearer ", "");

        const payload = verify(token, authJwt.secret) as payloadTokenInterface;
        return payload;
    } catch (e) {
        const error = e as VerifyErrors;

        console.log("Error", error);
        throw new Error(`${error.name}: ${error.message}`);
    }
}


export const setTokenCookie = async (res: Response, token: string) => {
    try {
        const options:CookieOptions = {
            httpOnly: true,
            secure: false 
        }
    
        res.cookie('access_token', token, options);
    } catch (e) {
        const error = e as Error;
        console.log("Erro ao realizar login: ", error.name);
        throw new Error("Erro ao realizar login");
    }
}

export const getTokenCookie = async (req: Request):Promise<string> => {
    try {
        const token = await req.cookies.access_token;

        return token;
    } catch(e) {
		console.log(e);
        throw new Error("Erro ao recuperar cookie");
    }
}

export const clearTokenCookie = async (res: Response) => {
    try {

        res.clearCookie('access_token', {
            httpOnly: true,
            secure: false // Defina como 'true' em produção
        });
    } catch (err) {
        throw new Error("Erro ao deletar cookie");
    }
}