import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

export const initializeSocketIO = async (server: HttpServer) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket: Socket) => {
        console.log("Cliente conectado: ", socket.id);

        socket.on('disconnect', () => {
            console.log("Cliente desconectado: ", socket.id);
        })
    });

    return io;
}