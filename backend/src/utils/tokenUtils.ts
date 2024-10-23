import { authJwt } from "@/config"
import { userInterface } from "@/interfaces/userInterface"
import { JwtPayload, sign, verify, VerifyErrors } from "jsonwebtoken"

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