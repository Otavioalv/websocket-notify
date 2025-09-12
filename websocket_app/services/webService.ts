import webApi from "./webApi";
import axios, { AxiosError, AxiosResponse } from "axios";



export type createUserType = {
    name: string,
    passwd: string
};


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



export const createUser = async (data: createUserType) => {
    try {
        const endPoint: string = "/notify/create-user";

        console.log(data);
        const response = await webApi.post(endPoint, data)  as responseAxiosInterface;
        console.log(response);
        return;
    } catch(error) {
        const err = error as errorAxiosInterface

        console.log(err.response.data);
        return;
    }
}

export const loginUser = async (data: createUserType) => {
    try {
        const endPoint: string = "/notify/login-user";

        console.log(data);
        const response = await webApi.post(endPoint, data) as responseAxiosInterface;
        console.log(response);
        
        return;
    } catch (error) {
        const err = error as errorAxiosInterface;
        console.log(err.response.data);
        return;
    }
}

export const listUsers = async () => {
    try {
        const endPoint: string = "/notify/list-users";

        const response = await webApi.post(endPoint, {}) as responseAxiosInterface;
        console.log(response);
        
        return;
    } catch (error) {
        const err = error as errorAxiosInterface;
        console.log(err.response);
        return;
    }
}






// TESTE
export const test = async () => {
    const URL = "https://softwium.com/api";

    const bookApi = axios.create({
        baseURL: URL
    });
    try {
        const res = await bookApi.get("/books");

        const listBooks = res.data;

        // console.log(listBooks);
        return listBooks
    } catch (err) {
        console.log("Erro ao resgatar lista de livros: ", err);
        return [];
    } 
}