import axios, {AxiosError, AxiosResponse} from "axios";
import { userDataForm } from "../@types/userData";
import { choseNotify } from "./ToastService";


// "http://127.0.0.1:8090/"
// "http://192.168.1.115:8090/"
const URL_API: string = "http://192.168.1.115:8090/";  // /notify /login-user




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
        // {withCredentials: true, headers: {"Content-Type": "aplication/json"}}

        const url: string = URL_API + "notify/login-user"
        const response = await axios.post(url, data, {
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        }) as responseAxiosInterface;

        console.log(response.data);
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

export async function privateRouterTest() {
    try {
        console.log("Private router");
        

        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImdhYnJpZWwiLCJpYXQiOjE3Mjk2OTIwNzl9.4PZ6hqs0T4ZtICmP2wAOHWIHPquyqwt6oR66vFHFsiU
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Im90YXZpbyIsImlhdCI6MTcyOTc4MTU2OX0.v-E6qkY_SmfIVUQebVTX5D4Myr3akEcOTG_VFHMpVok
        const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Im90YXZpbyIsImlhdCI6MTcyOTc4MTU2OX0.v-E6qkY_SmfIVUQebVTX5D4Myr3akEcOTG_VFHMpVok";

        const headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        
        const url: string = URL_API + "notify/authenticate-test";
        const response = await axios.post(url, {}, headers) as responseAxiosInterface;

        await choseNotify([response.data.message], response.status);

    } catch (error) {
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
    }
}

export async function privateRouterTestCookie() {
    try {
        console.log("Private router");
        
        
        const url: string = URL_API + "notify/authenticate-cookie";
        const response = await axios.post(url, {}, {
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        }) as responseAxiosInterface;


        await choseNotify([response.data.message], response.status);
    } catch (error) {
        const err = error as errorAxiosInterface;
        await choseNotify([err.response.data.message], err.response.status);
    }
}