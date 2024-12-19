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
	

    const handleGetUserId = async (id: number):Promise<void> => {
        const result:messageInterface[] = await listMensagesService(id);
		setListMessages(result);
		setToUser(id);
		console.log(listMsg, toUser);
    }
		
	const handleSendMessage = async (msg:string):Promise<void> => {
		await sendMessageService(msg, toUser);
	}
	
	useEffect(() => {
		socket.on("message_from", (message: messageInterface) => {
			setListMessages([...listMsg, message]);
			console.log(listMsg);
		});
		
		return () => {
			socket.off("message_from");
		}
	}, [listMsg]);
	
    return (
        <div className="flex h-full">
            <ListUsers onClick={handleGetUserId}/>
            
			<div className="w-full h-full flex flex-col relative">
				{toUser ? (
					<>	
						<Message listMessages={listMsg} toUser={toUser}/>
						
					</>
				) : (
					<div className="text-white">
						começe escolhendo um usuario para enviar menssagem
					</div>
				)}
				
				<InputMessageText sendMsg={handleSendMessage}/>
			</div>		
        </div>
    )
}