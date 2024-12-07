import React, {useEffect, useState} from "react";
import {messageInterface} from "../../data/@types/userData";
import ListUsers from "./ListUsers";
import Message from "./Message";
import InputMessageText from "../components/inputs/InputMessageText";
import { listMensagesService, sendMessageService } from "../../data/services/WebsocketService";

export default function Chat() {
    useEffect(() => {
    }, [])
	
	const [listMsg, setListMessages] = useState<messageInterface[]>([]);
	const [toUser, setToUser] = useState<number>(0);
	

    const handlegetUserId = async (id: number):Promise<void> => {
        const result:messageInterface[] = await listMensagesService(id);
		setListMessages(result);
		setToUser(id);
		console.log(listMsg, toUser);
    }
		
	const handleSendMessage = async (msg:string):Promise<void> => {
		await sendMessageService(msg, toUser);
	}
	
    return (
        <div className="flex h-full">
            <ListUsers onClick={handlegetUserId}/>
            
			<div className="w-full h-full flex flex-col">
				<Message listMessages={listMsg}/>
				<InputMessageText sendMsg={handleSendMessage}/>
			</div>		
        </div>
    )
}