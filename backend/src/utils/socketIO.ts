import { Express, Request, Response } from "express";
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { getPayload } from './tokenUtils';
import { payloadTokenInterface, basicMessageInterface } from '@/interfaces/userInterface';
import { UserModel } from "@/model/UserModel";
import { configAPI, configCookie } from "@/config";
import { responseMessages } from "./responseMessages";

let io: Server | null = null;
const userModel: UserModel = new UserModel();


export const initializeSocketIO = async (server: HttpServer, app: Express) => {
    if(!io){
        try {
            // Cria um MAP da lista de usuarios conectados 
            // fazer o usuario ter uma lista de ids, fazendo com que ele se conecte em varios dispositivos
			const userSocketMap = new Map<number | string, string>();
			
            io = new Server(server, {
                cors: {
                    origin: configAPI.validAddress, 
                    credentials: true
                }
            });
        
            io.on('connection', async (socket: Socket) => {
                console.log("Cliente conectado: ", socket.id);
                
                const {cookieNameToken} = configCookie;

                const token = socket.request.headers.cookie?.replace(`${cookieNameToken}=`, "");
                const payload:payloadTokenInterface | null = token ? await getPayload(token) : null;

                if(token && payload) {
                    
                    const userID: number = payload.id;
					
					// Adiciona o usuario ao map, atribui o id do mesmo que e fixo ao id do socket io que e variavel
                    userSocketMap.set(userID, socket.id);
                    
                    socket.on('disconnect', () => {
                        userSocketMap.delete(userID);
                        console.log("Cliente desconectado: ", socket.id);
                    })
					
                    socket.on("create_message", async (msg:string, toUser: number) => {

						if(toUser && io){
							const message:basicMessageInterface = {
								message: msg,
								from_user: userID,
								to_user: toUser,
                                at_date: new Date()
							};
						
							const toUserSocketID:string = userSocketMap.get(message.to_user) ?? "";
							const fromUserSocketID:string = userSocketMap.get(message.from_user) ?? "";

                            // console.log(message);
                            if(!message.message.length) {
                                allertError(io, "Escreva uma menssagem", 400, fromUserSocketID);
                                return;
                            }

                            // So o from e necessario, pois ele que vai enviar, se o to nao estiver online, ele nao vai estar na lista
                            // entao so vai salvar a menssagem no banco de dados
                            if(fromUserSocketID){
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
                })
    
                
            });
        } catch(err) {
            console.log(err);
            return app.use((err: any, req: Request, res: Response) => {
                res.status(500).send(
                    {
                        message: responseMessages.InternalServerError
                    }
                );
            });
        }
    }
    return io;
}

const allertError = (io: Server, msg: string, status: number, user: string) => {
    interface responseSocketIO {
        message: string,
        status: number
    }

    const response: responseSocketIO = {
        message: msg,
        status: status
    }

    io.to(user).emit("allertError", response);
}


export const getIO = async() => {
    if(!io) throw new Error("Socket io não inicializado");
    return io;
}
