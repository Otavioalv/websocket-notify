import webApi from "./webApi";
import axios from "axios";



export type createUserType = {
    name: string,
    passwd: string
};

export const createUser = async (data: createUserType) => {
    try {
        const endPoint: string = "/notify/create-user";

        const response = await webApi.post(endPoint, data);

        console.log(response);

        return;
    } catch(err) {
        console.log(err);
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