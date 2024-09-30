import { userInterface } from '@/interfaces/userInterface';
import { UserModel } from '@/model/UserModel';
import {Request, Response} from 'express';


class UserController {
    private userModel: UserModel = new UserModel();

    public async createUser(req: Request, res: Response): Promise<void>{
        try {
            const data:userInterface = await req.body;

            const errorsData:string[] = await this.validateDataCreateUser(data);

            if(errorsData.length) {
                res.status(401).send({message: "Erro ao criar usuario", errors: errorsData});
                return;
            }

            const user = await this.userModel.findUserByName(data.name);

            if(user.name) {
                res.status(401).send({message: "Ussuario ja existe, realize o login"});
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
            

            if(!data.name || !data.passwd) {
                res.status(400).send({message: "Insira os parametros corretamente"});
                return;
            }

            

            // Verificar se usuario existe
            

            res.status(200).send({message: "Login realizado com sucesso"});
        } catch(err) {
            res.status(500).send({message: "Erro interno no servidor"});
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

        if(data.passwd.length > 10) {
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

    private async generateTokenUser(user:userInterface): Promise<string>{
        const payload: {name: string} = {
            name: user.name
        };



        return '';
    }
}

export {UserController}