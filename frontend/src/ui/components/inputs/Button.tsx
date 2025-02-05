import {ButtonHTMLAttributes} from "react";

export default function Button({...rest}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <div className="bg-violet-600/30  hover:bg-violet-700 border border-white/10 rounded-lg cursor-pointer z-10 backdrop-blur text-white">
            <button className="font-semibold w-full h-full p-4" {...rest}>{rest.name}</button>
        </div>
    );
}