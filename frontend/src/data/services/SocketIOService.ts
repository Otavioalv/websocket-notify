import { io, Socket } from "socket.io-client";


// "http://localhost:8090/"
// "http://192.168.1.115:8090/"
// "http://192.168.1.5:8090/"
// "http://192.168.1.4:8090/"
// "http://10.8.2.24:8090/"

const URL:string = "http://10.8.2.24:8090/";
const socket:Socket = io(URL, {withCredentials:true});


export default socket;
