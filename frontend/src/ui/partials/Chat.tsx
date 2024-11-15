import React, {useEffect} from "react";
import ListUsers from "./ListUsers";
import { listMensages } from "../../data/services/WebsocketService";

export default function Chat() {
    useEffect(() => {
    }, [])

    const handlegetUserId = async (id: number) => {
        console.log("teste", id);

        await listMensages(id);
    }

    return (
        <div className="flex h-full">
            <ListUsers onClick={handlegetUserId}/>
            <div className="text-white">
                chat
            </div>
        </div>
    )
}