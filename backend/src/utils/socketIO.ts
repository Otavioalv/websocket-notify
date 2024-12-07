import { Express, Request, Response } from "express";
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { getPayload } from './tokenUtils';
import { payloadTokenInterface, messageInterface } from '@/interfaces/userInterface';

let io: Server | null = null;

export const initializeSocketIO = async (server: HttpServer, app: Express) => {
    if(!io){
        try {
            const userSocketMap = new Map<number | string, string>();
            io = new Server(server, {
                cors: {
                    origin: ["http://localhost:3000",  "http://192.168.1.115:3000", "http://192.168.1.5:3000", "http://127.0.0.1:3000"], 
                    credentials: true
                }
            });
        
            io.on('connection', async (socket: Socket) => {
                console.log("Cliente conectado: ", socket.id);
    
                const token = socket.request.headers.cookie?.replace("access_token=", "");
                const payload:payloadTokenInterface | null = token ? await getPayload(token) : null;   
                
                if(token && payload) {
                    const userID: number = payload.id;
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

                    socket.on("create_message", (msg:string, toUser: number) => {
                        
						if(toUser) {
							console.log(msg, toUser);
							return;
						}
						
						console.log("nao faz nada");
						
						// mandar a menssagem unicamente
						
						// const message = {
                        //     content,
                        //     from: socket.userID,
                        //     to,
                        //     };
                        //     socket.to(to).to(socket.userID).emit("private message", message);
                        //     messageStore.saveMessage(message);                         
                    });

                }

                // Teste
                socket.on('logout', () => {
                    socket.disconnect();
                    console.log("usuario desconectado");
                })
    
                
            });
        } catch(err) {
            console.log("Errororor", err);
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


export const getIO = async() => {
    if(!io) throw new Error("Socket io não inicializado");
    return io;
}


/* 
// Eu to usando token jwt para guardar as informações do usuario
    // Incluindo id, e nome de usuario,
    // Ao inves de passar o id como parametro eu posso simplesmente pegar-lo pelo token JWT
    // eu posso descriptografar o token, pegar o id
    // posso usar esse id pra enviar ou mandar mensagem 
    // Nao posso salvar o id do socket io no cookie, seria falho
    // Uma posibilidade e salcar como objeto MAP, mas tambem seria falho
    // Poderia salvar o id do socket io no token, alterando o valor dele,  (boa possibilidade)
    // pra isso seria melhor fazer no momento do login. (boa possibilidade)

    // utilizar o id do usuario disponivel no token
    // associar o id do socket io ao id do usuario
    // 


socket.on("private message", ({ content, to }) => {)
const message = {
content,
from: socket.userID,
to,
};
socket.to(to).to(socket.userID).emit("private message", message);
messageStore.saveMessage(message); 
*/


// testar futuramente 
// export class SocketIO {
//     private server:HttpServer;
//     private static io: Server | null;

//     constructor(server: HttpServer) {
//         this.server = server;
//         SocketIO.io = null;
//     }

//     // So precisa de um atributo fixo nao uma clase inteira
//     public async socketInit():Promise<void> {
//         try{
//             if(!SocketIO.io){
//                 SocketIO.io = new Server(this.server, {
//                     cors: {
//                         origin: "http://localhost:3000",
//                         methods: ['GET', 'POST']
//                     }
//                 });
        
//                 SocketIO.io.on('connection', (socket: Socket) => {
//                     console.log("Cliente conectado: ", socket.id);
        
//                     socket.on('disconnect', () => {
//                         console.log("Cliente desconectado: ", socket.id);
//                     })
//                 });
//             }
//         } catch(err) {
//             console.log(err);
//             throw new Error("Erro ao criar conexao com websocket");
//         }
//     }

//     public async getIO():Promise<Server>{
//         if(!SocketIO.io) throw new Error("Websocket não foi inicializado");
//         return SocketIO.io;
//     }
// }