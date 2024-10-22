import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ToastiNotification() {
    return (
        <div className="absolute right-10">
            <ToastContainer/>
        </div>
     )
}