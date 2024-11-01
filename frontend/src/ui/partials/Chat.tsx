import React, {useEffect} from "react";
import ListUsers from "./ListUsers";
import socket from "../../data/services/SocketIOService";

export default function Chat() {
    useEffect(() => {
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