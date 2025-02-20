import React from "react";
import { userPictureInterface } from "../../../data/@types/userData";

interface ListPartProps {
    user: userPictureInterface, 
    onClick: (user: userPictureInterface) => void,
    userSelected: userPictureInterface,
}


export default function ListPart({user, onClick, userSelected}: ListPartProps) {
    console.log(user.id_user === userSelected.id_user);

    return (
        <li 
            className={`${user.id_user === userSelected.id_user ? "bg-violet-600/20" : "bg-violet-600/5" } hover:bg-violet-600/20 cursor-pointer rounded-sm w-full flex items-center gap-4 p-2 `}
            onClick={() => onClick(user)}
        >
            <div className="w-12 h-12 relative overflow-hidden rounded-full">
                <img 
                    src={`${user.url_img}`} 
                    alt={user.name} 
                    className="object-cover h-full"
                />
            </div>
            <h3>{user.name}</h3>
        </li>
    )
}