import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { userPictureInterface } from "../../data/@types/userData";


interface HeaderMessageInterface {
    test?: number
    setReturn: React.Dispatch<React.SetStateAction<userPictureInterface>>,

}

export default function HeaderMessage({setReturn}: HeaderMessageInterface) {
    const handleSetReturn = async () => {
        const user:userPictureInterface = {
            id_picture: 0,
            id_user: 0, 
            name: "",
            passwd: "",
            picture_created_at: new Date(),
            picture_description: "",
            picture_name: "",
            url_img: ""
        }
        setReturn(user);
    }

    // const handleSetReturn = async () => {
    //     test = 0;
    // }

    return (
        <div className="bg-violet-800 p-2 flex items-center z-10">
            <button className="w-6 h-6 m-0" onClick={handleSetReturn}>
                <BsArrowReturnLeft className="w-full h-full text-white"/>
            </button>
        </div>
    )
}