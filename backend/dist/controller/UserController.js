"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserModel_1 = require("../model/UserModel");
const tokenUtils_1 = require("../utils/tokenUtils");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const config_1 = require("../config");
const response_1 = require("../utils/response");
const responseMessages_1 = require("../utils/responseMessages");
class UserController {
    userModel = new UserModel_1.UserModel();
    async createUser(req, res) {
        try {
            const data = await req.body;
            data.name = data.name.trim();
            data.passwd = data.passwd?.trim();
            const errorsData = await this.validateDataCreateUser(data);
            if (errorsData.length) {
                res.status(401).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.ErrorCreatingUser));
                return;
            }
            const user = await this.userModel.findUserByName(data.name);
            if (user.name) {
                res.status(401).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.UserAlreadyExists));
                return;
            }
            // envia os dados para banco de dados
            await this.userModel.createUser(data);
            res.status(201).send((0, response_1.successResponse)(responseMessages_1.responseMessages.UserCreatingSuccess));
            return;
        }
        catch (err) {
            res.status(500).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.InternalServerError));
            return;
        }
    }
    async loginUser(req, res) {
        try {
            const data = await req.body;
            data.name = data.name.trim();
            data.passwd = data.passwd?.trim();
            const errorsData = await this.validateDataCreateUser(data);
            if (errorsData.length) {
                res.status(401).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.MandatoryParameters, errorsData));
                return;
            }
            // if(!data.name || !data.passwd) {
            //     res.status(400).send({message: "Insira os parametros corretamente"});
            //     return;
            // }
            // Verificar se usuario existe
            const user = await this.userModel.findUserByName(data.name);
            if (!user.name) {
                res.status(401).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.UserDontExists));
                return;
            }
            // Verificar se senha esta correta
            if (data.passwd !== user.passwd) {
                res.status(401).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.IncorrecPassword));
                return;
            }
            // Gerar token
            const token = await (0, tokenUtils_1.genereteTokenUser)(user);
            // Salva nos Cookies
            await (0, tokenUtils_1.setTokenCookie)(res, token);
            res.status(200).send((0, response_1.successResponse)(responseMessages_1.responseMessages.LoginSuccessful));
        }
        catch (err) {
            console.log(err);
            res.status(500).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.InternalServerError));
        }
    }
    async logoutUser(req, res) {
        try {
            await (0, tokenUtils_1.clearTokenCookie)(res);
            res.status(200).send((0, response_1.successResponse)(responseMessages_1.responseMessages.LogoutSuccessful));
        }
        catch (err) {
            console.log(err);
            res.status(500).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.InternalServerError));
        }
    }
    async listUsers(req, res) {
        try {
            const payload = await req.body.payload;
            const list = await this.userModel.listUsers(payload);
            res.status(200).send((0, response_1.successResponse)(responseMessages_1.responseMessages.UserListSuccessful, list));
        }
        catch (err) {
            console.log(err);
            res.status(500).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.InternalServerError));
        }
    }
    async listMenssages(req, res) {
        try {
            const { userId } = req.params;
            const payload = req.body.payload;
            if (!userId) {
                res.status(404).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.MandatoryParameters));
                return;
            }
            const listMessagesUser = await this.userModel.listMenssages(payload.id, userId);
            res.status(200).send((0, response_1.successResponse)(responseMessages_1.responseMessages.MessageListSuccessful, listMessagesUser));
        }
        catch (err) {
            console.log(err);
            res.status(500).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.InternalServerError));
        }
    }
    async uploadPicture(req, res) {
        try {
            const image = req.file;
            if (!image) {
                res.status(404).send((0, response_1.successResponse)(responseMessages_1.responseMessages.InsertImage));
                return;
            }
            const dataImage = await this.generateDataPicture(req);
            await this.verifyIfPictureExists(dataImage.id_user);
            await this.userModel.uploadPicture(dataImage);
            res.status(201).send((0, response_1.successResponse)(responseMessages_1.responseMessages.ImageSaveSuccessful));
        }
        catch (err) {
            console.log(err);
            res.status(500).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.InternalServerError));
        }
    }
    async listUserFromToken(req, res) {
        try {
            const payload = req.body.payload;
            const { id } = payload;
            const listUser = await this.userModel.findUserById(id);
            res.status(200).send((0, response_1.successResponse)(responseMessages_1.responseMessages.UserInformation, listUser));
        }
        catch (err) {
            console.log(err);
            res.status(500).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.InternalServerError));
        }
    }
    async updateUser(req, res) {
        try {
            const image = req.file;
            const userData = req.body;
            const name = userData.name.trim();
            const { id } = req.body.payload;
            if (image) {
                const dataImage = await this.generateDataPicture(req);
                await this.verifyIfPictureExists(dataImage.id_user);
                await this.userModel.uploadPicture(dataImage);
            }
            ;
            await this.userModel.updateUser(name, id);
            res.status(200).send((0, response_1.successResponse)(responseMessages_1.responseMessages.UserUpdateSuccessful));
        }
        catch (err) {
            console.log(err);
            res.status(500).send((0, response_1.errorResponse)(responseMessages_1.responseMessages.InternalServerError));
        }
    }
    async generateDataPicture(req) {
        try {
            const image = req.file;
            const { id } = req.body.payload;
            const completeUrl = `http://${config_1.configAPI.serverHost}:${config_1.configAPI.port}`;
            const description = `Picture from User ID - ${id}`;
            const imageUrl = `${completeUrl}/picturesWb/${image.filename}`;
            const dataImage = {
                id_user: id,
                picture_name: image.filename,
                url_img: imageUrl,
                picture_description: description,
                picture_created_at: new Date(), // preenchimento irrelevante
                id_picture: 0, // preenchimento irrelevante
            };
            return dataImage;
        }
        catch (err) {
            throw new Error(responseMessages_1.responseMessages.ErrorGenerateImage);
        }
    }
    async verifyIfPictureExists(id_user) {
        try {
            const imagePath = path_1.default.join(__dirname, '..', 'picturesWb');
            const pictureUser = await this.userModel.getPictureFromUser(id_user);
            if (pictureUser.length) {
                const oldImgUrl = pictureUser[0].url_img;
                const oldImagePath = path_1.default.join(imagePath, path_1.default.basename(oldImgUrl));
                // Deleta a imagem
                (0, fs_1.unlink)(oldImagePath, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        }
        catch (err) {
            throw err;
        }
    }
    async validateDataCreateUser(data) {
        const errorsArr = [];
        if (!data.name) {
            errorsArr.push(responseMessages_1.responseMessages.InsertName);
        }
        if (!data.passwd) {
            errorsArr.push(responseMessages_1.responseMessages.InsertPassword);
        }
        if (data.passwd && data.passwd.length < 8) {
            errorsArr.push(responseMessages_1.responseMessages.MinCharacterPassws);
        }
        if (data.passwd && data.passwd.length > 10) {
            errorsArr.push(responseMessages_1.responseMessages.MaxCharacterPassws);
        }
        if (data.name.length <= 2) {
            errorsArr.push(responseMessages_1.responseMessages.MinCharacterName);
        }
        if (data.name.length > 500) {
            errorsArr.push(responseMessages_1.responseMessages.MaxCharacterName);
        }
        return errorsArr;
    }
}
exports.UserController = UserController;
