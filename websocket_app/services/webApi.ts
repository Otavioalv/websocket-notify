import axios from 'axios';



const URL: string = "http://192.168.1.125";
const PORT: number = 8090;
const baseURL: string = `${URL}:${PORT}`;

// console.log(baseURL);

const webApi = axios.create({
    baseURL
});

export default webApi;