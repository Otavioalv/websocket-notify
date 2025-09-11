import axios from 'axios';


// http://10.8.1.36
// http://192.168.1.125
const URL: string = "http://10.8.1.36";
const PORT: number = 8090;
const baseURL: string = `${URL}:${PORT}`;

console.log(baseURL);

const webApi = axios.create({
    baseURL,
    withCredentials: true,
    headers: {"Content-Type": "application/json"}  
});

export default webApi;