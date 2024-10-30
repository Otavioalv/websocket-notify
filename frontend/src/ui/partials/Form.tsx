import React, {useState, ChangeEvent, MouseEvent} from "react";
import { createUser, loginUser, logoutCookie, testPrivate} from "../../data/services/WebsocketService";

import {FaUser, FaLock, FaLockOpen} from 'react-icons/fa';

import InputField from "../components/inputs/InputField";
import Button from "../components/inputs/Button";

import { userData} from "../../data/@types/userData";
import { useNavigate } from "react-router-dom";


export default function Form () {

    const [formData, setFormData] = useState<userData>({
        name: '',
        passwd: ''
    });

    const navigate = useNavigate();        


    const handleFormEdit = async (event: ChangeEvent<HTMLInputElement>, name:string) => {
        setFormData(
            {
                ...formData,
                [name]: event.target.value
            }
        )
    }

    const handleForm = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const btt:string = e.currentTarget.id;
        

        if(btt === 'login'){
            await loginUser(formData, navigate);
        }
        else if(btt === "singup") {
            await createUser(formData);
        }

        // router dom tem um componente chamado Redirect, que redireciona para outra pagina. Usar isso ou algo similar aqui
    } 
    
    const handleLogOutCookie = async() => {
        console.log("Botao cookir");
        await logoutCookie();
    }

    const handleTestPrivate = async() => {
        await testPrivate();
    }


    return (
        <div className="flex justify-center items-center  w-full h-full m-0 p-0  text-white">
            
            <div className="absolute left-0 top-0">
                <button className="bg-black p-3 rounded-md  " onClick={handleLogOutCookie}>
                    Logout Cookie
                </button>

                <button className="bg-black p-3 rounded-md  " onClick={handleTestPrivate}>
                    test private
                </button>
            </div>

            <form className="flex flex-col gap-6 p-5 w-96 max-w-96 rounded-lg relative bg-violet-600 overflow-hidden" onChange={(e) => {e.preventDefault()}}>
                
                <InputField 
                    dataInfo={{
                        name: "username", 
                        type: "text", 
                        value: formData.name,
                        onChange: (event) => {handleFormEdit(event, 'name')}, 
                        icon: FaUser
                    }}
                />

                <InputField 
                    dataInfo={{
                        name: "password", 
                        type: "password", 
                        value: formData.passwd,
                        onChange: (event) => {handleFormEdit(event, 'passwd')},
                        icon: FaLock, 
                        altIcon: FaLockOpen
                    }}
                />
                
                <div className="absolute z-0  w-[640px] h-[800px] rounded-[40%] left-0 top-0 ml-[-30%] mt-[-47%] bg-gradient-to-r from-violet-600/60 to-violet-900/60 animate-spin-3s"></div>
                <div className="absolute z-0  w-[640px] h-[800px] rounded-[40%] left-0 top-24 -ml-3 bg-gradient-to-r from-violet-600/60 to-violet-900/60 animate-spin-4s"></div>
                <div className="absolute z-0  w-[640px] h-[800px] rounded-[40%] -left-10 mt-[5%] top-32 -ml-3 bg-gradient-to-r from-violet-600/60 to-violet-900/60 animate-spin-5s"></div>

                <Button name='LOGIN' id="login" type="submit" onClick={handleForm}/>
                <h1 className="z-10"> No account? Sing up!</h1>
                <Button name="SING UP" id="singup" type="submit" onClick={handleForm}/>
            </form>
        </div>
    )
}