import React from "react";
import { userPictureInterface } from "../../../data/@types/userData";

interface ListPartProps {
    user: userPictureInterface, 
    onClick: (user: userPictureInterface) => void
}


export default function ListPart({user, onClick}: ListPartProps) {

    return (
        <li 
            className="bg-violet-600/5 hover:bg-violet-600/20 cursor-pointer rounded-sm w-full flex items-center gap-4 p-2"
            onClick={() => onClick(user)}
        >
            <div className="min-w-12 min-h-12 relative overflow-hidden rounded-full">
                <img 
                    src={`${user.url_img}`} 
                    alt={user.name} 
                    className="absolute min-w-full min-h-full"
                    
                />
            </div>
            <h3>{user.name}</h3>
        </li>
    )
}