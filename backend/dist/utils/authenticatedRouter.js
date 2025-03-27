"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedRouter = authenticatedRouter;
const tokenUtils_1 = require("./tokenUtils");
const response_1 = require("./response");
const responseMessages_1 = require("./responseMessages");
async function authenticatedRouter(req, res, next) {
    try {
        const token = await (0, tokenUtils_1.getTokenCookie)(req);
        // Verifica se foi fornecido o token
        if (!token || !token.replace("Bearer ", "")) {
            return res.status(403).send((0, response_1.successResponse)(responseMessages_1.responseMessages.InaccessibleRoute));
        }
        // Pega payload
        const payload = await (0, tokenUtils_1.getPayload)(token.replace("Bearer ", ""));
        // Criar um chave payload para ser usada globalmente sem a necessidade de extrair o token e depois gerar o payload
        req.body.payload = payload;
        return next();
    }
    catch (e) {
        const error = e;
        console.log(error.message);
        res.status(403).send((0, response_1.successResponse)(responseMessages_1.responseMessages.UserAuthenticationProblem, [error.message]));
    }
}
