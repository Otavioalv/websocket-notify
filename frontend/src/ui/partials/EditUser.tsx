import React, { ChangeEvent, useEffect, useState, MouseEvent, useCallback } from 'react';
import { listUser, updateUser } from '../../data/services/WebsocketService';
import { userData, userPictureInterface } from '../../data/@types/userData';
import Button from '../components/inputs/Button';
import ContainerCard from '../components/ContainerCard';
import "../styles/EditUser.css"
import InputField from '../components/inputs/InputField';
import { FaUser } from 'react-icons/fa';
import { CiImageOn } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';


// pegar as informações do usuario atraves do token
export default function EditUser() {
    const [user, setUser] = useState<userPictureInterface>({id_picture: 0, id_user: 0, name: "", passwd: "", picture_created_at: new Date(), picture_description: "", picture_name: "", url_img: ""});
    const [updateButton, setUpdateButton] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<userData>({
        id_user: 0, 
        name: "",
        passwd: "",
        at_date: new Date()
    });

    // Função de receber usuario
    const handlerUser = useCallback(async () => {
         const userList:userPictureInterface[] = await listUser();
         setUser(userList[0]);
    }, []);

    const handleUpdateButton = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setUpdateButton(!updateButton);
    }

    const handleFormEdit = async (event: ChangeEvent<HTMLInputElement>, name:string) => {
        setFormData(
            {
                ...formData,
                [name]: event.target.value
            }
        )
    }

    const handleUpdateUser = async (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const username: string = formData.name || user.name;
        await updateUser(selectedFile, username, navigate);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    }

    useEffect(() => {
        handlerUser();
    }, [handlerUser]);


    return(
        <ContainerCard>
            <div className='flip-card'>
                <div 
                    className='flip-card-inner'
                    style={{transform: `${updateButton ? "rotateY(180deg)" : "none"}`}}
                >
                    <div className={`flip-card-front z-10`}>
                        {user? (
                            <>
                                <div className='min-w-52 min-h-52 relative overflow-hidden rounded-full'>
                                    <img src={user.url_img} alt={`user-${user.name}-picture`} className='absolute min-w-full min-h-full'/>
                                </div>
                                
                                <div className="name-container">
                                    <p className='text-lg'>
                                        {user.name}
                                    </p>
                                </div>

                                <div className='button-container'>
                                    <Button name='UPDATE' onClick={handleUpdateButton}/>
                                </div>
                                
                                <div className="date-container">
                                    <p className=''>
                                        {new Date(user?.at_date?.toString() || "").toLocaleString("pt-BR").substring(0, 10)}
                                    </p>
                                </div>
                            </>
                        ) : null}
                    </div>

                    <div className='flip-card-back z-20'>
                        {user ? (
                            <>
                                <form className='w-full flex flex-col justify-center items-center gap-4' onChange={(e) => {e.preventDefault()}}>
                                    
                                    <div className='flex justify-center items-center flex-col w-full'>
                                        <input 
                                            type="file" 
                                            accept='.png, .jpeg, .jpg'
                                            onChange={handleFileChange}
                                            id="file-input"
                                            className='hidden'
                                        />

                                        <label 
                                            htmlFor="file-input"
                                            className='
                                                w-full
                                                flex
                                                flex-col
                                                justify-center
                                                items-center
                                                p-6
                                                bg-dashed-lg
                                                rounded
                                                hover:bg-violet-900/40
                                                cursor-pointer
                                            '
                                        >
                                            <CiImageOn className='w-28 h-full'/>
                                            <p>
                                                Insira uma imagem
                                            </p>
                                        </label>
                                    </div>

                                    

                                    <InputField
                                        dataInfo={{
                                            name: user.name, 
                                            type: "text", 
                                            value: formData.name,
                                            onChange: (event) => {handleFormEdit(event, 'name')}, 
                                            icon: FaUser
                                        }}
                                    />

                                    <div className='w-full flex flex-col gap-4'>
                                        <Button name='UPDATE' onClick={handleUpdateUser}/>
                                        <Button name='CANCEL' onClick={handleUpdateButton}/>
                                    </div>
                                </form>    
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </ContainerCard>
    ) 
}