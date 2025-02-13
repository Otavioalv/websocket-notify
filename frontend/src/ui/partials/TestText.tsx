import React, {useState, ChangeEvent, MouseEvent} from "react";
import { createAndLogin, loginUser} from "../../data/services/WebsocketService";

import {FaUser, FaLock, FaLockOpen} from 'react-icons/fa';

import InputField from "../components/inputs/InputField";
import Button from "../components/inputs/Button";

import { userData} from "../../data/@types/userData";
import { useNavigate } from "react-router-dom";
import ContainerCard from "../components/ContainerCard";

export default function TestText() {
    const [formData, setFormData] = useState<userData>({
        name: '',
        passwd: '',
        id_user: 0
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
            // await createUser(formData, navigate);
            await createAndLogin(formData, navigate);
        }
    } 

    return (
        <ContainerCard>
            <form className="flex flex-col gap-6 p-5 w-96 max-w-96 rounded-lg relative  overflow-hidden text-white" onChange={(e) => {e.preventDefault()}}>
                
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

                <Button name='LOGIN' id="login" type="submit" onClick={handleForm}/>
                <h1 className="z-10"> No account? Sing up!</h1>
                <Button name="SING UP" id="singup" type="submit" onClick={handleForm}/>
            </form>
        </ContainerCard>
    );
}