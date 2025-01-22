import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";

export default function HeaderMessage() {
    
    
    return (
        <div className="bg-violet-500 p-2 flex items-center">
            <button className="w-6 h-6 m-0">
                <BsArrowReturnLeft className="w-full h-full text-white"/>
            </button>
        </div>
    )
}