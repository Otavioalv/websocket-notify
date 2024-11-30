import React, {useEffect, useState} from "react";
import {messageInterface} from "../../data/@types/userData";
import ListUsers from "./ListUsers";
import Message from "./Message";
import { listMensagesService } from "../../data/services/WebsocketService";

export default function Chat() {
    useEffect(() => {
    }, [])
	
	const [listMsg, setListMessages] = useState<messageInterface[]>([]);

    const handlegetUserId = async (id: number) => {
        const result:messageInterface[] = await listMensagesService(id);
		setListMessages(result);
		console.log(listMsg);
    }
    return (
        <div className="flex h-full">
            <ListUsers onClick={handlegetUserId}/>
            
			<Message listMessages={listMsg}/>
        </div>
    )
}