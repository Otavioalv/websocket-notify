import axios, {AxiosError, AxiosResponse} from "axios";
import { userData, messageInterface, userPictureInterface } from "../@types/userData";
import { choseNotify } from "./ToastService";
import { NavigateFunction } from "react-router-dom";
import socket from "./SocketIOService";


// "http://localhost:8090/"
// "http://192.168.1.115:8090/"
// "http://192.168.1.5:8090/"
// "http://192.168.1.4:8090/"
// "http://10.8.2.24:8090/"
const URL_API: string = "http://10.8.2.24:8090/";  // /notify /login-user



interface responseAxiosInterface extends AxiosResponse{
    data: {
        message: string,
        errors?: string[],
        token?: string
        results?: any,
    }
}

interface errorAxiosInterface extends AxiosError {
    response: responseAxiosInterface
}


export async function loginUser(data: userData, navigate?: NavigateFunction):Promise<void>{
    try {
        const url: string = URL_API + "notify/login-user";

        const response = await axios.post(url, data, {
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        }) as responseAxiosInterface;
        
        
        if(response.status >= 200 && response.status <= 299){
            socket.on('connect', () => {
                console.log("Conectado");
            });
        }

        // Se passar navigate, ele vai pra chat
        if(navigate){
            navigate('/chat');
            window.location.reload();
        }

        await choseNotify([response.data.message], response.status);
        
    } catch (error) {
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
    }
}

export async function createUser(data: userData, navigate: NavigateFunction):Promise<void> {
    try {
        const url: string = URL_API + "notify/create-user"
        const response = await axios.post(url, data) as responseAxiosInterface;    
        

        // navigate('/insert-image');
        // window.location.reload();

        await choseNotify([response.data.message], response.status);
    } catch (error) {
        
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
        await choseNotify(err.response.data.errors?.map( m => m) || [], 100);
        throw err
    }
}

export async function createAndLogin(data:userData, navigate: NavigateFunction): Promise<void>{
    try {
        await createUser(data, navigate);
        await loginUser(data);

        navigate('/insert-image');
        window.location.reload();   
    } catch (error) {
        console.log(error);
    }
}

export async function logoutCookie():Promise<void> {
    try {   
        const url:string = URL_API + "notify/logout-user"
        const response = await axios.post(url, {}, {withCredentials: true}) as responseAxiosInterface;

        socket.emit('logout');
        await choseNotify([response.data.message], response.status);
    } catch (error) {
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
    }
}

export async function listUsers(): Promise<userPictureInterface[]>{
    try {
        const url:string = URL_API + "notify/list-users"
        const response = await axios.post(url, {}, {withCredentials: true}) as responseAxiosInterface;
        // console.log(response.data);
        await choseNotify([response.data.message], response.status);

        const list: userPictureInterface[] = response.data.results;
        return list;
    } catch (error) {
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
        return [];
    }
}

export async function listUser(): Promise<userPictureInterface[]> {
    try {
        const url:string = URL_API + "notify/list-user-from-token"
        const response = await axios.post(url, {}, {withCredentials: true}) as responseAxiosInterface;

        await choseNotify([response.data.message], response.status);

        const user: userPictureInterface[] = response.data.results;
        return user;
    } catch (error) {
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
        return [];
    }
}

export async function listMensagesService(userId: number): Promise<messageInterface[]> {
    try {
        const url:string = `${URL_API}notify/list-menssages/${userId}`;
        
        const response = await axios.post(url, {}, {
            withCredentials: true,
        }) as responseAxiosInterface;

		const list:messageInterface[] = response.data.results;
        
        console.log(list);
		return list;
    } catch(error) {
        const err = error as errorAxiosInterface;
        console.log(err);
        await choseNotify([err.response.data.message], err.response.status);
		
        return [];
    }
}

export async function sendMessageService(msg:string, toUser:number): Promise<void> {
	try {
		socket.emit('create_message', msg, toUser);
	} catch(error) {
		const err = error as errorAxiosInterface;
		console.log(err);
	}
}

export async function uploadImageService(fileImage: File | null, navigate: NavigateFunction): Promise<void>{
    try {
        const url:string = `${URL_API}notify/upload-picture`;

        if(!fileImage) {
            await choseNotify(["Insira uma imagem"], 400);
            return;
        }

        const formData = new FormData();
        formData.append('image', fileImage);

        const response = await axios.post(url, formData,  {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }) as responseAxiosInterface;    

        navigate('/chat');
        window.location.reload();

        await choseNotify([response.data.message], response.status);
    } catch(error) {
        const err = error as errorAxiosInterface;
        console.log(err);
        await choseNotify([err.response.data.message], err.response.status);
    }
}

export async function updateUser(fileImage: File | null, username: string, navigate: NavigateFunction): Promise<void>{
    try {
        const url:string = `${URL_API}notify/update-user`;
        
        
        const formData = new FormData();
            

        if(fileImage) formData.append('image', fileImage);

        formData.append("name", username);
        
        const response = await axios.post(url, formData,  {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }) as responseAxiosInterface;    
        
        await choseNotify([response.data.message], response.status);    

        window.location.reload();
    } catch(error) {
        const err = error as errorAxiosInterface;
        console.log(err);
        await choseNotify([err.response.data.message], err.response.status);
    }
}


export async function testPrivate() {
    try {
        const url:string = URL_API + "notify/authenticate-test"

        const response = await axios.post(url, {}, {withCredentials: true});
        console.log(response.data.message);
    } catch (error) {
        console.log("Erro");
    }
}
