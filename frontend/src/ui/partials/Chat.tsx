import React, {useEffect, useState} from "react";
import {messageInterface} from "../../data/@types/userData";
import ListUsers from "./ListUsers";
import Message from "./Message";
import InputMessageText from "../components/inputs/InputMessageText";
import { listMensagesService, sendMessageService } from "../../data/services/WebsocketService";
import socket from "../../data/services/SocketIOService";

export default function Chat() {
	
	const [listMsg, setListMessages] = useState<messageInterface[]>([]);
	const [toUser, setToUser] = useState<number>(0);
	

    const listMessages = async (id: number):Promise<void> => {
        const result:messageInterface[] = await listMensagesService(id);
		console.log(result, id);
		setListMessages(result);
		setToUser(id);
    }
		
	const handleSendMessage = async (msg:string):Promise<void> => {
		if(msg.length)
			await sendMessageService(msg, toUser);
	}
	
	useEffect(() => {
		socket.on("message_from", (message: messageInterface) => {
			console.log("TOUSER: ", toUser)
			console.log(message);
			if(toUser === message.to_user)
				setListMessages([...listMsg, message]);
		});
		
		return () => {
			socket.off("message_from");
		}
	}, [listMsg, toUser]);
	
    return (
        <div className="flex h-full min-h-lvh max-h-lvh">
            <ListUsers onClick={listMessages}/>
            
			<div className="w-full min-h-full flex flex-col relative">
				{toUser ? (
					<>	
						<Message listMessages={listMsg} toUser={toUser}/>
						<InputMessageText sendMsg={handleSendMessage}/>
					</>
				) : (
					<div className="text-white">
						começe escolhendo um usuario para enviar menssagem
					</div>
				)}
			</div>		
        </div>
    )
}