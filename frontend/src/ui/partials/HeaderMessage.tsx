import React from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { userPictureInterface } from "../../data/@types/userData";


interface HeaderMessageInterface {
    user: userPictureInterface
    setReturn: React.Dispatch<React.SetStateAction<userPictureInterface>>,

}

export default function HeaderMessage({setReturn, user}: HeaderMessageInterface) {
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
    console.log(user);


    // const handleSetReturn = async () => {
    //     test = 0;
    // }

    return (
        <div className="bg-violet-800 p-2 px-6 flex items-center z-10 gap-6">
            <button className="w-6 h-6 m-0" onClick={handleSetReturn}>
                <BsArrowReturnLeft className="w-full h-full text-white"/>
            </button>

            <div className="flex justify-center items-center gap-4 text-white">
                <div className="min-w-12 min-h-12 relative overflow-hidden rounded-full">
                    <img src={user.url_img} alt="user-header-img" className="absolute min-w-full min-h-full"/>
                </div>

                <p>
                    {user.name}
                </p>
            </div>
        </div>
    )
}