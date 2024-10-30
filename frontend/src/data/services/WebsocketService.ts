import axios, {AxiosError, AxiosResponse} from "axios";
import { userData } from "../@types/userData";
import { choseNotify } from "./ToastService";
import { NavigateFunction } from "react-router-dom";


// "http://localhost:8090/"
// "http://192.168.1.115:8090/"
const URL_API: string = "http://localhost:8090/";  // /notify /login-user



interface responseAxiosInterface extends AxiosResponse{
    data: {
        message: string,
        errors?: string[],
        token?: string
        results?: any
    }
}

interface errorAxiosInterface extends AxiosError {
    response: responseAxiosInterface
}


export async function loginUser(data: userData, navigate: NavigateFunction):Promise<void>{
    try {
        const url: string = URL_API + "notify/login-user"
        console.log(url);
        const response = await axios.post(url, data, {
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        }) as responseAxiosInterface;
        
        navigate('/chat');
        await choseNotify([response.data.message], response.status);
        
    } catch (error) {
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
    }
}

export async function createUser(data: userData):Promise<void> {
    try {
        const url: string = URL_API + "notify/create-user"
        const response = await axios.post(url, data) as responseAxiosInterface;    
        
        await choseNotify([response.data.message], response.status);
    } catch (error) {
        
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
        await choseNotify(err.response.data.errors?.map( m => m) || [], 100);
    }
}

export async function logoutCookie():Promise<void> {
    try {   
        const url:string = URL_API + "notify/logout-user"
        const response = await axios.post(url, {}, {withCredentials: true}) as responseAxiosInterface;
        
        await choseNotify([response.data.message], response.status);
    } catch (error) {
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
    }
}

export async function listUsers(): Promise<userData[]>{
    try {
        const url:string = URL_API + "notify/list-users"
        const response = await axios.post(url, {}, {withCredentials: true}) as responseAxiosInterface;

        console.log(response.data.results);
        await choseNotify([response.data.message], response.status);

        const list: userData[] = response.data.results;

        return list;
    } catch (error) {
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
        return [];
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
