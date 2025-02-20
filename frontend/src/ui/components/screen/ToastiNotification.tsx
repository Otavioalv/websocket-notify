import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ToastiNotification() {

    const contextClass = {
        success: "bg-green-300/10 text-white",
        error: "bg-red-600/10",
        info: "bg-gray-600/10",
        warning: "bg-yellow-300/10",
        default: "bg-indigo-600/10",
        dark: "bg-white-600/10 font-gray-300"
    };

    return (
        <div className="absolute right-10">
            <ToastContainer 
                pauseOnFocusLoss={false}
                autoClose={3000}
                closeOnClick={true}
                toastClassName={(context) => contextClass[context?.type || "default"] + " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer my-2 backdrop-blur"}
            />
        </div>
     )
}