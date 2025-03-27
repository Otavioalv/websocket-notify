"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configCookie = exports.configDb = exports.configAPI = exports.authJwt = void 0;
require('dotenv').config();
// Configuração de autenticação JWT
exports.authJwt = {
    secret: String(process.env.JWT_SECRET)
};
// Configuração da API
exports.configAPI = {
    localHost: String(process.env.LOCAL_HOST),
    publicHost: String(process.env.PUBLIC_HOST),
    serverHost: String(process.env.SERVER_HOST),
    port: String(process.env.PORT),
    validAddress: String(process.env.VALID_ADDRESS).replace(/ /g, "").split(","),
};
// Configuração do banco de dados
exports.configDb = {
    port: String(process.env.PSQL_PORT),
    host: String(process.env.PSQL_HOST),
    pswd: String(process.env.PSQL_PSWD),
    user: String(process.env.PSQL_USER),
    database: String(process.env.PSQL_DB)
};
// Configuração dos Cookies
exports.configCookie = {
    cookieNameToken: String(process.env.COOKIE_NAME_TOKEN)
};
