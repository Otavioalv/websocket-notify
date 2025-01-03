import { payloadTokenInterface, userInterface, messageInterface } from '@/interfaces/userInterface';
import { UserModel } from '@/model/UserModel';
import {CookieOptions, Request, Response} from 'express';
import { clearTokenCookie, genereteTokenUser, getPayload, getTokenCookie, setTokenCookie } from '@/utils/tokenUtils';
import { getIO } from '@/utils/socketIO';
import { Socket } from 'socket.io';
class UserController {
    private userModel: UserModel = new UserModel();

    public async createUser(req: Request, res: Response): Promise<void>{
        try {
            const data:userInterface = await req.body;
			
			data.name = data.name.trim();
			data.passwd = data.passwd?.trim();
			
            const errorsData:string[] = await this.validateDataCreateUser(data);

            if(errorsData.length) {
                res.status(401).send({message: "Erro ao criar usuario", errors: errorsData});
                return;
            }

            const user = await this.userModel.findUserByName(data.name);
            if(user.name) {
                res.status(401).send({message: "Ussuario ja existe"});
                return;
            }

            // envia os dados para banco de dados
            await this.userModel.createUser(data);

            res.status(201).send({message: "Usuario criado com sucesso"});
            return;
        } catch (err) {
            res.status(500).send({message: "Erro interno no servidor"});
            return;
        }
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        try{
            const data: userInterface = await req.body;
			
				
			data.name = data.name.trim();
			data.passwd = data.passwd?.trim();
			
            if(!data.name || !data.passwd) {
                res.status(400).send({message: "Insira os parametros corretamente"});
                return;
            }

            
            // Verificar se usuario existe
            const user = await this.userModel.findUserByName(data.name);
            if(!user.name) {
                res.status(401).send({message: "Usuario não existe"});
                return;
            }

            // Verificar se senha esta correta
			
            if(data.passwd !== user.passwd){
                res.status(401).send({message: "Senha incorreta"});
                return;
            }

            // Gerar token
            const token:string = await genereteTokenUser(user);

            // Salva nos Cookies
            await setTokenCookie(res, token);

            // Futuramente, nao enviar token, fazer a API salvar o token no cookie fazendo com que o cliente nao tenha acesso ao token, tornando o sistema mais seguro
            res.status(200).send({message: "Login realizado com sucesso", token: token});
        } catch(err) {
            console.log(err);
            res.status(500).send({message: "Erro interno no servidor"});
        }
    }

    public async logoutUser(req: Request, res: Response): Promise<void> {
        try {

            await clearTokenCookie(res);

            res.status(200).send({message: "LogOut realizado com sucesso"});
        } catch (err) {
            console.log(err);
            res.status(500).send({message: "Erro interno no servidor"});
        }
    }

    public async listUsers(req: Request, res: Response): Promise<void> {
        try {
            const payload = await req.body.payload as payloadTokenInterface;

            const list:userInterface[] = await this.userModel.listUsers(payload);


            res.status(200).send({message: "Ussuarios listados com sucesso", results: list});
        } catch (err) {
            console.log(err);
            res.status(500).send({message: "Erro interno no servidor"});
        }
    }

    public async listMenssages(req: Request, res: Response):Promise<void>{
        try {
            const {userId} = req.params as unknown as {userId: number|null};
			const token:string = await getTokenCookie(req);
			const payload:payloadTokenInterface = await getPayload(token);
			

            if(!userId) {
                res.status(404).send({menssage: "Insira os parametros corretamente"});
                return;
            }
                
	
            const listMessagesUser:messageInterface[] = await this.userModel.listMenssages(payload.id, userId);

            res.status(200).send({message: "menssagens listadas com sucesso", results: listMessagesUser});
        } catch (err) {
            console.log(err);
            res.status(500).send({menssage: "Erro interno no servidor"});
        }
    } 

    private async validateDataCreateUser(data:userInterface): Promise<string[]>{
        const errorsArr: string[] = [];

        if(!data.name){
            errorsArr.push('Insira um nome');
        }

        if(!data.passwd) {
            errorsArr.push('Insira uma senha');
        }

        if(data.passwd && data.passwd.length < 8) {
            errorsArr.push('Senha deve conter no minimo 8 caracteres');
        }

        if(data.passwd && data.passwd.length > 10) {
            errorsArr.push('Senha deve conter no maximo 10 caracteres');
        }

        if(data.name.length <= 2) {
            errorsArr.push("Nome deve conter no minimo 2 caracteres");
        }

        if(data.name.length > 500) {
            errorsArr.push("Nome deve conter no maximo 500 caracteres");
        }

        return errorsArr;
    }
}

export {UserController}