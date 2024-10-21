import React, { useEffect, useState, ChangeEvent} from "react";
import { loginUser } from "../../data/services/WebsocketService";

import {FaUser, FaLock, FaLockOpen} from 'react-icons/fa';

import InputField from "../components/inputs/InputField";
import Button from "../components/inputs/Button";

import { userDataForm } from "../../data/@types/userData";



export default function Form () {

    const [formData, setFormData] = useState<userDataForm>({
        username: '',
        passwd: ''
    });

    const handleFormEdit = (event: ChangeEvent<HTMLInputElement>, name:string) => {
        setFormData(
            {
                ...formData,
                [name]: event.target.value
            }
        )
    }

    const handleForm = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
    }

    // useEffect(() => {
    //     loginUser();
    // }, []);

    return (
        <div className="bg-slate-900 flex justify-center items-center  w-full h-full m-0 p-0  text-white">
            <form className="flex flex-col gap-6 p-5 w-96 max-w-96 rounded-lg relative bg-violet-600 overflow-hidden" onSubmit={handleForm}>
                
                <InputField 
                    dataInfo={{
                        name: "username", 
                        type: "text", 
                        value: formData.username,
                        onChange: (event) => {handleFormEdit(event, 'username')}, 
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
                
                {/* <InputField dataInfo={{name: "password", type: "password", icon: FaLock, altIcon: FaLockOpen}}/> */}
                
                <div className="absolute z-0  w-[540px] h-[700px] rounded-[40%] left-0 top-0 ml-[-20%] mt-[-47%] bg-gradient-to-r from-violet-600/60 to-violet-900/60 animate-spin-3s"></div>
                <div className="absolute z-0  w-[540px] h-[700px] rounded-[40%] left-0 top-24 -ml-3 bg-gradient-to-r from-violet-600/60 to-violet-900/60 animate-spin-4s"></div>
                <div className="absolute z-0  w-[540px] h-[700px] rounded-[40%] -left-10 mt-[5%] top-32 -ml-3 bg-gradient-to-r from-violet-600/60 to-violet-900/60 animate-spin-5s"></div>

                
                <h1 className="z-10"> No account? Sing up!</h1>

                <Button name='LOGIN' type="submit"/>
                <Button name="SING UP" type="submit"/>
            </form>
        </div>
    )
}