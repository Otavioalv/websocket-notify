import { Express, Request, Response } from "express";
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { getPayload } from './tokenUtils';
import { payloadTokenInterface, basicMessageInterface } from '@/interfaces/userInterface';
import { UserModel } from "@/model/UserModel";

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
                    origin: ["http://localhost:3000",  "http://192.168.1.115:3000", "http://192.168.1.5:3000", "http://127.0.0.1:3000", "http://192.168.1.4:3000"], 
                    credentials: true
                }
            });
        
            io.on('connection', async (socket: Socket) => {
                console.log("Cliente conectado: ", socket.id);
    
                const token = socket.request.headers.cookie?.replace("access_token=", "");
                const payload:payloadTokenInterface | null = token ? await getPayload(token) : null;   
                
                if(token && payload) {
                    
                    const userID: number = payload.id;
					
					// Adiciona o usuario ao map, atribui o id do mesmo que e fixo ao id do socket io que e variavel
                    userSocketMap.set(userID, socket.id);
                    
                    console.log(userSocketMap);


                    socket.on('disconnect', () => {
                        userSocketMap.delete(userID);
                        console.log("Cliente desconectado: ", socket.id);
                    })
					
					// Fazer futuramente
					socket.on("list_messages", () => {
						console.log("Menssagens listadas");
					});

                    socket.on("create_message", async (msg:string, toUser: number) => {
                        
						if(toUser && io){
							const message:basicMessageInterface = {
								message: msg,
								from_user: userID,
								to_user: toUser,
                                at_date: new Date()
							};
							// console.log(message);
							// console.log("socket id TO: ", userSocketMap.get(message.to_user));
							// console.log("socket id FROM: ", userSocketMap.get(message.from_user));
							
                            
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

                                // Criar uma sala para somente 2 usuarios
                                console.log(toUserSocketID, fromUserSocketID);
                                
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
                        message: "Erro interno no servidor"
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
