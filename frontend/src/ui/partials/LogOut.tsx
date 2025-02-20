import React, { useEffect } from "react";
import { logoutCookie } from "../../data/services/WebsocketService";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
    const navigate = useNavigate();

    useEffect(() => {
        logoutCookie();
        navigate('/');
    }, [navigate]);
    
    return (
        <></>
    )
}