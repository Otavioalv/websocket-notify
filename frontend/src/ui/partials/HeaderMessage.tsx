import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";


interface HeaderMessageInterface {
    setReturn: React.Dispatch<React.SetStateAction<number>>
}

export default function HeaderMessage({setReturn}: HeaderMessageInterface) {
    const handleSetReturn = async () => {
        setReturn(0);
    }

    return (
        <div className="bg-violet-800 p-2 flex items-center z-10">
            <button className="w-6 h-6 m-0" onClick={handleSetReturn}>
                <BsArrowReturnLeft className="w-full h-full text-white"/>
            </button>
        </div>
    )
}