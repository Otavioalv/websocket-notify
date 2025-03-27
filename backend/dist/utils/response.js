"use strict";
// Manipula as respostas pra retornar ao usuario
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
// Retorna uma resposta de sucesso
const successResponse = (message, results) => ({
    status: "success",
    message: message,
    results
});
exports.successResponse = successResponse;
// Retorna uma resposta de erro
const errorResponse = (message, errors) => ({
    status: "error",
    message: message,
    errors: errors instanceof Error ? errors.message : errors
});
exports.errorResponse = errorResponse;
