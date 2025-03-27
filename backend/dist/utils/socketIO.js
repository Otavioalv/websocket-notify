"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initializeSocketIO = void 0;
const socket_io_1 = require("socket.io");
const tokenUtils_1 = require("./tokenUtils");
const UserModel_1 = require("../model/UserModel");
const config_1 = require("../config");
const responseMessages_1 = require("./responseMessages");
let io = null;
const userModel = new UserModel_1.UserModel();
const initializeSocketIO = async (server, app) => {
    if (!io) {
        try {
            // Cria um MAP da lista de usuarios conectados 
            // fazer o usuario ter uma lista de ids, fazendo com que ele se conecte em varios dispositivos
            const userSocketMap = new Map();
            io = new socket_io_1.Server(server, {
                cors: {
                    origin: config_1.configAPI.validAddress,
                    credentials: true
                }
            });
            io.on('connection', async (socket) => {
                console.log("Cliente conectado: ", socket.id);
                const { cookieNameToken } = config_1.configCookie;
                const token = socket.request.headers.cookie?.replace(`${cookieNameToken}=`, "");
                const payload = token ? await (0, tokenUtils_1.getPayload)(token) : null;
                if (token && payload) {
                    const userID = payload.id;
                    // Adiciona o usuario ao map, atribui o id do mesmo que e fixo ao id do socket io que e variavel
                    userSocketMap.set(userID, socket.id);
                    socket.on('disconnect', () => {
                        userSocketMap.delete(userID);
                        console.log("Cliente desconectado: ", socket.id);
                    });
                    socket.on("create_message", async (msg, toUser) => {
                        if (toUser && io) {
                            const message = {
                                message: msg,
                                from_user: userID,
                                to_user: toUser,
                                at_date: new Date()
                            };
                            const toUserSocketID = userSocketMap.get(message.to_user) ?? "";
                            const fromUserSocketID = userSocketMap.get(message.from_user) ?? "";
                            // console.log(message);
                            if (!message.message.length) {
                                allertError(io, "Escreva uma menssagem", 400, fromUserSocketID);
                                return;
                            }
                            // So o from e necessario, pois ele que vai enviar, se o to nao estiver online, ele nao vai estar na lista
                            // entao so vai salvar a menssagem no banco de dados
                            if (fromUserSocketID) {
                                // mandar menssagem ao usuario (individual)
                                io?.to(toUserSocketID).to(fromUserSocketID).emit("message_from", message);
                                // salvar menssagem no banco de dados
                                await userModel.saveMessage(message);
                                return;
                            }
                        }
                    });
                }
                // Teste
                socket.on('logout', () => {
                    socket.disconnect();
                    console.log("usuario desconectado");
                });
            });
        }
        catch (err) {
            console.log(err);
            return app.use((err, req, res) => {
                res.status(500).send({
                    message: responseMessages_1.responseMessages.InternalServerError
                });
            });
        }
    }
    return io;
};
exports.initializeSocketIO = initializeSocketIO;
const allertError = (io, msg, status, user) => {
    const response = {
        message: msg,
        status: status
    };
    io.to(user).emit("allertError", response);
};
const getIO = async () => {
    if (!io)
        throw new Error("Socket io não inicializado");
    return io;
};
exports.getIO = getIO;
