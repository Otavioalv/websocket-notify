import React, {useState} from "react";
import { userPictureInterface } from "../../../data/@types/userData";

interface ListPartProps {
    user: userPictureInterface, 
    onClick: (id: number) => void
}


export default function ListPart({user, onClick}: ListPartProps) {
    const [url, _] = useState<string>("http://192.168.1.4:8090");  // temporario

    return (
        <li 
            className="bg-violet-600/5 hover:bg-violet-600/20 cursor-pointer rounded-sm w-full flex items-center gap-4 p-2"
            onClick={() => onClick(user.id_user)}
        >
            <img 
                src={`${url}${user.url_img}`} 
                alt={user.name} 
                className="w-12 h-12 bg-white rounded-full"
                
            />
            <h3>{user.name}</h3>
        </li>
    )
}