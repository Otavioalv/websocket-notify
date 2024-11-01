import { io, Socket } from "socket.io-client";

const URL:string = "http://localhost:8090/"
const socket:Socket = io(URL, {withCredentials:true});


export default socket;
