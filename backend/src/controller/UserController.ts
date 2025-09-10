import { payloadTokenInterface, userInterface, messageInterface, pictureInterface, userPictureInterface } from '@/interfaces/userInterface';
import { UserModel } from '@/model/UserModel';
import {Request, Response} from 'express';
import { clearTokenCookie, genereteTokenUser, setTokenCookie } from '@/utils/tokenUtils';
import path from 'path';
import { unlink } from 'fs';
import { configAPI } from '@/config';
import { errorResponse, successResponse } from '@/utils/response';
import { responseMessages } from '@/utils/responseMessages';

class UserController {
    private userModel: UserModel = new UserModel();

    public async createUser(req: Request, res: Response): Promise<void>{
        try {
            const data:userInterface = await req.body;
			
			data.name = data.name.trim();
			data.passwd = data.passwd?.trim();
			
            const errorsData:string[] = await this.validateDataCreateUser(data);

            if(errorsData.length) {
                res.status(401).send(errorResponse(responseMessages.ErrorCreatingUser, errorsData));
                return;
            }

            const user = await this.userModel.findUserByName(data.name);
            if(user.name) {
                res.status(401).send(errorResponse(responseMessages.UserAlreadyExists));
                return;
            }

            // envia os dados para banco de dados
            await this.userModel.createUser(data);

            res.status(201).send(successResponse(responseMessages.UserCreatingSuccess));
            return;
        } catch (err) {
            res.status(500).send(errorResponse(responseMessages.InternalServerError));
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
                res.status(401).send(errorResponse(responseMessages.MandatoryParameters, errorsData));
                return;
            }

            // if(!data.name || !data.passwd) {
            //     res.status(400).send({message: "Insira os parametros corretamente"});
            //     return;
            // }

            
            // Verificar se usuario existe
            const user:userInterface = await this.userModel.findUserByName(data.name);
            if(!user.name) {
                res.status(401).send(errorResponse(responseMessages.UserDontExists));
                return;
            }

            // Verificar se senha esta correta
            if(data.passwd !== user.passwd){
                res.status(401).send(errorResponse(responseMessages.IncorrecPassword));
                return;
            }

            // Gerar token
            const token:string = await genereteTokenUser(user);

            // Salva nos Cookies
            await setTokenCookie(res, token);

            res.status(200).send(successResponse(responseMessages.LoginSuccessful));
        } catch(err) {
            console.log(err);
            res.status(500).send(errorResponse(responseMessages.InternalServerError));
        }
    }

    public async logoutUser(req: Request, res: Response): Promise<void> {
        try {

            await clearTokenCookie(res);

            res.status(200).send(successResponse(responseMessages.LogoutSuccessful));
        } catch (err) {
            console.log(err);
            res.status(500).send(errorResponse(responseMessages.InternalServerError));
        }
    }

    public async listUsers(req: Request, res: Response): Promise<void> {
        try {
            const payload = await req.body.payload as payloadTokenInterface;

            const list:userPictureInterface[] = await this.userModel.listUsers(payload);

            res.status(200).send(successResponse(responseMessages.UserListSuccessful, list));
        } catch (err) {
            console.log(err);
            res.status(500).send(errorResponse(responseMessages.InternalServerError));
        }
    }

    public async listMenssages(req: Request, res: Response):Promise<void>{
        try {
            const {userId} = req.params as unknown as {userId: number|null};
			const payload:payloadTokenInterface = req.body.payload as payloadTokenInterface;
            
            if(!userId) {
                res.status(404).send(errorResponse(responseMessages.MandatoryParameters));
                return;
            }
	
            const listMessagesUser:messageInterface[] = await this.userModel.listMenssages(payload.id, userId);

            res.status(200).send(successResponse(responseMessages.MessageListSuccessful, listMessagesUser));
        } catch (err) {
            console.log(err);
            res.status(500).send(errorResponse(responseMessages.InternalServerError));
        }
    } 

    public async uploadPicture(req: Request, res: Response): Promise<void>{
        try{
            const image  = req.file as Express.Multer.File;

            if(!image) {
                res.status(404).send(successResponse(responseMessages.InsertImage));
                return;
            }

            const dataImage:pictureInterface = await this.generateDataPicture(req);

            await this.verifyIfPictureExists(dataImage.id_user);

            await this.userModel.uploadPicture(dataImage);

            res.status(201).send(successResponse(responseMessages.ImageSaveSuccessful))
        } catch(err) {
            console.log(err)
            res.status(500).send(errorResponse(responseMessages.InternalServerError))
        }
    }

    public async listUserFromToken(req: Request, res: Response):Promise<void>{
        try {
            const payload:payloadTokenInterface = req.body.payload as payloadTokenInterface;
            const {id} = payload;
            
            const listUser:userPictureInterface[] = await this.userModel.findUserById(id);
            
            res.status(200).send(successResponse(responseMessages.UserInformation, listUser));
        } catch(err) {
            console.log(err);
            res.status(500).send(errorResponse(responseMessages.InternalServerError));
        }
    }

    public async updateUser(req: Request, res: Response):Promise<void>{
        try {
            const image  = req.file as Express.Multer.File;
            const userData = req.body as userInterface;
            const name = userData.name.trim();
            const {id} = req.body.payload as payloadTokenInterface;

            if(image) {
                const dataImage:pictureInterface = await this.generateDataPicture(req);
                await this.verifyIfPictureExists(dataImage.id_user);
                await this.userModel.uploadPicture(dataImage);
            };
            
            await this.userModel.updateUser(name, id);
            res.status(200).send(successResponse(responseMessages.UserUpdateSuccessful));
        } catch (err) {
            console.log(err);
            res.status(500).send(errorResponse(responseMessages.InternalServerError));
        }
    }

    private async generateDataPicture(req: Request): Promise<pictureInterface>{
        try{
            const image  = req.file as Express.Multer.File;

            const {id} = req.body.payload as payloadTokenInterface;

            const completeUrl:string = `http://${configAPI.serverHost}:${configAPI.port}`

            const description: string = `Picture from User ID - ${id}`;
            const imageUrl:string = `${completeUrl}/picturesWb/${image.filename}`; 


            const dataImage:pictureInterface = {
                id_user: id,
                picture_name: image.filename,
                url_img: imageUrl,
                picture_description: description,
                picture_created_at: new Date(), // preenchimento irrelevante
                id_picture: 0, // preenchimento irrelevante
            };

            return dataImage;
        } catch(err) {
            throw new Error(responseMessages.ErrorGenerateImage);
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
            errorsArr.push(responseMessages.InsertName);
        }

        if(!data.passwd) {
            errorsArr.push(responseMessages.InsertPassword);
        }

        if(data.passwd && data.passwd.length < 8) {
            errorsArr.push(responseMessages.MinCharacterPassws);
        }

        if(data.passwd && data.passwd.length > 10) {
            errorsArr.push(responseMessages.MaxCharacterPassws);
        }

        if(data.name.length <= 2) {
            errorsArr.push(responseMessages.MinCharacterName);
        }

        if(data.name.length > 500) {
            errorsArr.push(responseMessages.MaxCharacterName);
        }

        return errorsArr;
    }
}

export {UserController}