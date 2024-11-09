import React from "react";
import { userData } from "../../../data/@types/userData";

interface ListPartProps {
    user: userData, 
    onClick: (id: number) => void
}


export default function ListPart({user, onClick}: ListPartProps) {
    return (
        <li 
            className="bg-violet-600/5 hover:bg-violet-600/20 cursor-pointer rounded-sm w-full flex items-center gap-4 p-2"
            onClick={() => onClick(user.id_user)}
        >
            <img 
                src={"https://robohash.org/" + user.name} 
                alt={user.name} 
                className="w-12 bg-white rounded-full"
                
            />
            <h3>{user.name}</h3>
        </li>
    )
}