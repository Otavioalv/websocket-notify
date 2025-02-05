import React, { useEffect, useState } from 'react';
import { listUser } from '../../data/services/WebsocketService';
import { userPictureInterface } from '../../data/@types/userData';
import Button from '../components/inputs/Button';
import ContainerCard from '../components/ContainerCard';


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
            {/* flip card */}
            <div className='text-white p-6 px-16 rounded-md '>
                {/* flip card quando apertar o botao update */}

                {/* flip card inner */}
                <div className=''>
                    {/* flip card front */}
                    <div className='flex flex-col items-center justify-center gap-5'>
                        {user ? (
                            <>
                            
                                <div className='w-52 h-52 overflow-hidden rounded-full flex justify-center items-center z-10'>
                                    <img src={`https://placehold.co/600x800/EEE/31343C`} alt={`user-${user.name}-picture`} className=''/>
                                </div>
                                
                                <div className="z-10">
                                    <p className='text-center text-xl font-light'>
                                        {user.name}
                                    </p>
                                </div>

                                <div className='w-full h-12 rounded-md z-10'>
                                    <Button name='UPDATE'/>
                                </div>
                                
                                <div className="z-10 w-full text-right">
                                    <p className='text-xs'>
                                        {new Date(user?.at_date?.toString() || "").toLocaleString("pt-BR").substring(0, 10)}
                                    </p>
                                </div>
                            </>
                        ) : null}
                    </div>

                    {/* flip card back */}
                    <div>
                        {/* imagem */}
                        <div>
                            <img src="" alt="" />
                        </div>

                        {/* nome */}
                        <div>
                            <input type="text" />
                        </div>

                        {/* botao */}
                        <div>
                            <button></button>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerCard>
    ) 
}