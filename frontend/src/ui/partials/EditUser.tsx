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

    const returnToChat = () => {
        navigate("/chat");
    }

    useEffect(() => {
        handlerUser();
    }, [handlerUser]);


    return(
        <ContainerCard>
            <div className='min-w-96 h-[500px] p-4 text-white bg-transparent'>
                <div 
                    className='flip-card-inner flex relative h-full'
                    style={{transform: `${updateButton ? "rotateY(180deg)" : "none"}`}}
                >
                    <div className={`flip-card-front z-10 flex flex-col justify-center items-center gap-5 absolute w-full h-full`}>
                        {user? (
                            <>
                                <div className='min-w-52 min-h-52 relative overflow-hidden rounded-full'>
                                    <img src={user.url_img} alt={`user-${user.name}-picture`} className='absolute min-w-full min-h-full'/>
                                </div>
                                
                                <div className="">
                                    <p className='text-lg'>
                                        {user.name}
                                    </p>
                                </div>

                                <div className='w-full flex flex-col gap-4'>
                                    <Button name='UPDATE' onClick={handleUpdateButton}/>    
                                    <Button name="RETURN" onClick={returnToChat}/>
                                </div>
                                
                                <div className="w-full text-right">
                                    <p className='text-xs'>
                                        {new Date(user?.at_date?.toString() || "").toLocaleString("pt-BR").substring(0, 10)}
                                    </p>
                                </div>
                            </>
                        ) : null}
                    </div>

                    <div className='flip-card-back z-20 flex flex-col justify-center items-center gap-5 absolute w-full h-full'>
                        {user ? (
                            <>
                                <form className='w-full flex flex-col justify-center items-center gap-4' onChange={(e) => {e.preventDefault()}}>
                                    
                                    <div className='flex justify-center items-center flex-col w-full'>
                                        <input 
                                            type="file" 
                                            accept='.png, .jpeg, .jpg, .webp'
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