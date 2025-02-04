import React, { useEffect, useState } from 'react';
import { listUser } from '../../data/services/WebsocketService';
import { userPictureInterface } from '../../data/@types/userData';


// pegar as informações do usuario atraves do token
export default function EditUser() {
    const [user, setUser] = useState<userPictureInterface | null>(null);

    useEffect(() => {
        // handlerUser();
    }, [user]);

    // Função de receber usuario
    const handlerUser = async () => {
         const user:userPictureInterface[] = await listUser();
         setUser(user[0]);
    }



    return(
        <div>
            {user ? (
                <>
                    <div>
                        {/* Editar essa parte */}
                    {/* {new Date(user?.at_date?.toString()).toLocaleString("pt-BR")} */}

                    {/* {new Date(msg.at_date.toString()).toLocaleString("pt-BR")} */}
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                </>
            ) : null}
        </div>
    ) 
}