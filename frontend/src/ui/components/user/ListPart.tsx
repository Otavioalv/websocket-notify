import React from "react";
import { userData } from "../../../data/@types/userData";

export default function ListPart({user, key}: {user: userData, key: number}) {
    return (
        <li key={key} className="bg-violet-600/5 hover:bg-violet-600/20 cursor-pointer rounded-sm w-full flex items-center gap-4 p-2">
            <img 
                src={"https://robohash.org/" + user.name} 
                alt={user.name} 
                className="w-12 bg-white rounded-full"
            />
            <h3>{user.name}</h3>
        </li>
    )
}