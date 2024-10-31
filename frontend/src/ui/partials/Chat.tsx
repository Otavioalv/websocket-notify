import React, {useEffect} from "react";
import ListUsers from "./ListUsers";
import { io } from "socket.io-client";

export default function Chat() {
    useEffect(() => {
        const URL = "http://localhost:8090/"
        const socket = io(URL);

        socket.on('connect', () => {
            console.log("Conectado");
        });

        socket.on('disconnect', () => {
            console.log("Disconectado");
        });
    }, [])

    return (
        <div className="flex h-full">
            <ListUsers/>
            <div className="">
                chat
            </div>
        </div>
    )
}