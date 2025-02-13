import { payloadTokenInterface, userInterface, messageInterface, pictureInterface, userPictureInterface } from '@/interfaces/userInterface';
import { UserModel } from '@/model/UserModel';
import {Request, Response} from 'express';
import { clearTokenCookie, genereteTokenUser, setTokenCookie } from '@/utils/tokenUtils';
import path from 'path';
import fs, { unlink, rm, access} from 'fs';
import os from 'os';
import { configAPI } from '@/config';

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
			
            const errorsData:string[] = await this.validateDataCreateUser(data);

            if(errorsData.length) {
                res.status(401).send({message: "Insira os parametros corretamente", errors: errorsData});
                return;
            }

            // if(!data.name || !data.passwd) {
            //     res.status(400).send({message: "Insira os parametros corretamente"});
            //     return;
            // }

            
            // Verificar se usuario existe
            const user:userInterface = await this.userModel.findUserByName(data.name);
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

            res.status(200).send({message: "Login realizado com sucesso"});
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

            const list:userPictureInterface[] = await this.userModel.listUsers(payload);

            res.status(200).send({message: "Usuarios listados com sucesso", results: list});
        } catch (err) {
            console.log(err);
            res.status(500).send({message: "Erro interno no servidor"});
        }
    }

    public async listMenssages(req: Request, res: Response):Promise<void>{
        try {
            const {userId} = req.params as unknown as {userId: number|null};
			const payload:payloadTokenInterface = req.body.payload as payloadTokenInterface;
            
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

    public async uploadPicture(req: Request, res: Response): Promise<void>{
        try{
            const image  = req.file as Express.Multer.File;

            if(!image) {
                res.status(404).send({message: "Insira uma imagem"});
                return;
            }

            const {id} = req.body.payload as payloadTokenInterface;

            const description: string = `Picture from User ID - ${id}`;
            const imageUrl:string = `${configAPI.freeAddCmplt}/picturesWb/${image.filename}`;  // criar url com ip, o ip tem q ser global

            const dataImage:pictureInterface = {
                id_user: id,
                picture_name: image.filename,
                url_img: imageUrl,
                picture_description: description,
                picture_created_at: new Date(), // preenchimento irrelevante
                id_picture: 0, // preenchimento irrelevante
            };

            await this.verifyIfPictureExists(dataImage.id_user);

            await this.userModel.uploadPicture(dataImage);

            res.status(201).send({message: "Imagem salva com sucesso"})
        } catch(err) {
            console.log(err)
            res.status(500).send({message: "Erro interno no servidor"})
        }
    }

    public async listUserFromToken(req: Request, res: Response):Promise<void>{
        try {
            const payload:payloadTokenInterface = req.body.payload as payloadTokenInterface;
            const {id} = payload;
            
            const listUser:userPictureInterface[] = await this.userModel.findUserById(id);
            
            res.status(200).send({message: "Informações do usuario", results: listUser});

        } catch(err) {
            console.log(err);
            res.status(500).send({message: "Erro interno no servidor"});;
        }
    }

    public async updateUser(req: Request, res: Response):Promise<void>{
        try {
            const image  = req.file as Express.Multer.File;
            
            if(image)
                await this.uploadPicture(req, res);
        } catch (err) {
            console.log(err);
            res.status(500).send({message: "Erro interno no servidor"});
        }
    }

    private async verifyIfPictureExists(id_user: number){
        try {
            const imagePath:string = path.join(__dirname, '..', 'picturesWb')
            const pictureUser = await this.userModel.getPictureFromUser(id_user);

            if(pictureUser.length) {
                const oldImgUrl:string = pictureUser[0].url_img;
                const oldImagePath = path.join(imagePath, path.basename(oldImgUrl));

                // Deleta a imagem
                unlink(oldImagePath, (err) => {
                    if(err){
                        throw err
                    }
                });


            } 
        } catch (err) {
            throw err
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