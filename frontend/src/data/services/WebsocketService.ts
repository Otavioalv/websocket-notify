import axios, {AxiosError, AxiosResponse} from "axios";
import { userDataForm } from "../@types/userData";
import { choseNotify } from "./ToastService";


// "http://localhost:8090/"
// "http://192.168.1.115:8090/"
const URL_API: string = "http://localhost:8090/";  // /notify /login-user




interface responseAxiosInterface extends AxiosResponse{
    data: {
        message: string,
        errors?: string[],
        token?: string
    }
}

interface errorAxiosInterface extends AxiosError {
    response: responseAxiosInterface
}


export async function loginUser(data: userDataForm) {
    try {
        const url: string = URL_API + "notify/login-user"
        console.log(url);
        const response = await axios.post(url, data, {
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        }) as responseAxiosInterface;

        await choseNotify([response.data.message], response.status);
    } catch (error) {
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
    }
}

export async function createUser(data: userDataForm) {
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

export async function logoutCookie() {
    try {   
        const url:string = URL_API + "notify/logout-user"
        const response = await axios.post(url, {}, {withCredentials: true});
        console.log(response.data.message);
    } catch (error) {
        console.log("Erro no logout");
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
