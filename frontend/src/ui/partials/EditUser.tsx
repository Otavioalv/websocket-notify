import React, { useEffect, useState } from 'react';
import { listUser } from '../../data/services/WebsocketService';
import { userPictureInterface } from '../../data/@types/userData';
import Button from '../components/inputs/Button';
import ContainerCard from '../components/ContainerCard';
import "../styles/EditUser.css"


// pegar as informações do usuario atraves do token
export default function EditUser() {
    const [user, setUser] = useState<userPictureInterface | null>(null);

    useEffect(() => {
        handlerUser();
    }, []);

    // Função de receber usuario
    const handlerUser = async () => {
         const user:userPictureInterface[] = await listUser();
         setUser(user[0]);
         console.log(user);
    }



    return(
        <ContainerCard>
            <div className='flip-card'>
                <div className='flip-card-inner'>
                    <div className='flip-card-front'>
                        {user ? (
                            <>
                                <div className='img-container'>
                                    <img src={`https://placehold.co/600x800/EEE/31343C`} alt={`user-${user.name}-picture`} className=''/>
                                </div>
                                
                                <div className="name-container">
                                    <p className=''>
                                        {user.name}
                                    </p>
                                </div>

                                <div className='button-container'>
                                    <Button name='UPDATE'/>
                                </div>
                                
                                <div className="date-container">
                                    <p className=''>
                                        {new Date(user?.at_date?.toString() || "").toLocaleString("pt-BR").substring(0, 10)}
                                    </p>
                                </div>
                            </>
                        ) : null}
                    </div>

                    <div className='flip-card-back'>
                        {user ? (
                            <>
                                <div className='img-container'>
                                    <img src={`https://placehold.co/600x800/EEE/31343C`} alt={`user-${user.name}-picture`} className=''/>
                                </div>
                                
                                <div className="name-container">
                                    <p className=''>
                                        {user.name} - teste
                                    </p>
                                </div>

                                <div className='button-container'>
                                    <Button name='UPDATE - teste'/>
                                </div>
                                
                                <div className="date-container">
                                    <p className=''>
                                        {new Date(user?.at_date?.toString() || "").toLocaleString("pt-BR").substring(0, 10)} - teste
                                    </p>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </ContainerCard>
    ) 
}