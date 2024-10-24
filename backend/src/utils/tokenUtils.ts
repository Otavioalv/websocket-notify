import { authJwt } from "@/config"
import { JwtPayload, sign, verify, VerifyErrors } from "jsonwebtoken"
import { Response, Request, CookieOptions } from "express"

import { userInterface } from "@/interfaces/userInterface"

interface payloadTokenInterface extends JwtPayload{
    id: number,
    name: string
}


export const genereteTokenUser = async (user: userInterface):Promise<string> => {
    try {
        const payload: payloadTokenInterface = {
            id: user.id_user, 
            name: user.name
        }

        const token:string = sign(payload, authJwt.secret);
        
        console.log(token, payload);
        return token;
    } catch (e) {
        throw new Error("Erro ao gerar token");
    }
}

export const getPayload = async (token: string) => {
    try {
        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
        }
        const payload = verify(token, authJwt.secret) as payloadTokenInterface;
        return payload;
    } catch (e) {
        const error = e as VerifyErrors;
        throw new Error(`${error.name}: ${error.message}`);
    }
}


export const setTokenCookie = async (res: Response, token: string) => {
    try {
        const options:CookieOptions = {
            httpOnly: true,  /* Torna inacessivel no cliente */
            // secure: true, /* Possivel produção com HTTPS */
            secure: false,
            sameSite: "strict" /* Protege contra CSRF (deixando mais seguro)*/
        }
    
        res.cookie("access_token", token, options);   
    } catch (e) {
        const error = e as Error;
        console.log("Erro ao realizar login: ", error.name);
        throw new Error("Erro ao realizar login");
    }
}

export const getTokenCookie = async (req: Request) => {
    try {
        const cookies = await req.cookies["access_token"];

        console.log(cookies);
    } catch(e) {
        throw new Error("Erro ao recuperar cookie");
    }
}