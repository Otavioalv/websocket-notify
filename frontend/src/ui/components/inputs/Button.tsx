import React, {ButtonHTMLAttributes} from "react";

export default function Button({...rest}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <div className="bg-violet-600  hover:bg-violet-700 rounded-lg cursor-pointer z-10">
            <button className="font-semibold w-full h-full p-4" {...rest}>{rest.name}</button>
        </div>
    );
}