"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTokenCookie = exports.getTokenCookie = exports.setTokenCookie = exports.getPayload = exports.genereteTokenUser = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = require("jsonwebtoken");
const genereteTokenUser = async (user) => {
    try {
        const payload = {
            id: user.id_user,
            name: user.name
        };
        const token = (0, jsonwebtoken_1.sign)(payload, config_1.authJwt.secret);
        return token;
    }
    catch (e) {
        throw new Error("Erro ao gerar token");
    }
};
exports.genereteTokenUser = genereteTokenUser;
const getPayload = async (token) => {
    try {
        token = token.replace("Bearer ", "");
        const payload = (0, jsonwebtoken_1.verify)(token, config_1.authJwt.secret);
        return payload;
    }
    catch (e) {
        const error = e;
        console.log("Error", error);
        throw new Error(`${error.name}: ${error.message}`);
    }
};
exports.getPayload = getPayload;
const setTokenCookie = async (res, token) => {
    try {
        const options = {
            httpOnly: true,
            secure: false
        };
        const { cookieNameToken } = config_1.configCookie;
        res.cookie(cookieNameToken, token, options);
    }
    catch (e) {
        const error = e;
        console.log("Erro ao realizar login: ", error.name);
        throw new Error("Erro ao realizar login");
    }
};
exports.setTokenCookie = setTokenCookie;
const getTokenCookie = async (req) => {
    try {
        const token = await req.cookies.access_token;
        return token;
    }
    catch (e) {
        console.log(e);
        throw new Error("Erro ao recuperar cookie");
    }
};
exports.getTokenCookie = getTokenCookie;
const clearTokenCookie = async (res) => {
    try {
        const { cookieNameToken } = config_1.configCookie;
        res.clearCookie(cookieNameToken, {
            httpOnly: true,
            secure: false // Defina como 'true' em produção
        });
    }
    catch (err) {
        throw new Error("Erro ao deletar cookie");
    }
};
exports.clearTokenCookie = clearTokenCookie;
