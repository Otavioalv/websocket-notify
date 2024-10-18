import axios from "axios";

const URL_API: string = "http://127.0.0.1:8090/";  // /notify /login-user

export async function loginUser() {
    const url: string = URL_API + "notify/login-user"
    const response = await axios.post(url);
    
    console.log(response);
}