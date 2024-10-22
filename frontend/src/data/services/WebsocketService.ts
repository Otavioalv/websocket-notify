import axios, {AxiosError, AxiosResponse} from "axios";
import { userDataForm } from "../@types/userData";
import { choseNotify } from "./ToastService";

const URL_API: string = "http://127.0.0.1:8090/";  // /notify /login-user




interface responseAxiosInterface extends AxiosResponse{
    data: {
        message: string,
        errors?: string[]
    }
}

interface errorAxiosInterface extends AxiosError {
    response: responseAxiosInterface
}


export async function loginUser(data: userDataForm) {
    try {
        const url: string = URL_API + "notify/login-user"
        const response = await axios.post(url, data) as responseAxiosInterface;

        await choseNotify([response.data.message], response.status);
    } catch (error) {
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
    }
}

export async function createUser(data: userDataForm) {
    try {
        console.log(data);
        const url: string = URL_API + "notify/create-user"
        const response = await axios.post(url, data) as responseAxiosInterface;    

        await choseNotify([response.data.message], response.status);
    } catch (error) {
        
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
        await choseNotify(err.response.data.errors?.map( m => m) || [], 100);
    }
}