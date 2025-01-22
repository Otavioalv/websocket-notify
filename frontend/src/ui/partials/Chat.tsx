import React, {useEffect, useState} from "react";
import {messageInterface} from "../../data/@types/userData";
import ListUsers from "./ListUsers";
import Message from "./Message";
import InputMessageText from "../components/inputs/InputMessageText";
import { listMensagesService, sendMessageService } from "../../data/services/WebsocketService";
import socket from "../../data/services/SocketIOService";
import useWindowSize from "../../data/hooks/useWindowSize";



export default function Chat() {
	
	const [listMsg, setListMessages] = useState<messageInterface[]>([]);
	const [toUser, setToUser] = useState<number>(0);
	const windowSize = useWindowSize();

    const listMessages = async (id: number):Promise<void> => {
        const result:messageInterface[] = await listMensagesService(id);
		setListMessages(result);
		setToUser(id);
    }
		
	const handleSendMessage = async (msg:string):Promise<void> => {
		if(msg.length)
			await sendMessageService(msg, toUser);
	}
	
	useEffect(() => {
		socket.on("message_from", (message: messageInterface) => {
			if(toUser === message.to_user || toUser === message.from_user)
				setListMessages([...listMsg, message]);
		});
		
		return () => {
			socket.off("message_from");
		}
	}, [listMsg, toUser, windowSize]);
	
    return (
        <div className="flex h-lvh">
            <ListUsers onClick={listMessages}/>
            
			{(windowSize.width > 768 || toUser) ? (
				// div abaixo e a sessao de menssagem, editar pra deixar ersponsivo
				<div className="w-full  md:h-lvh h-full flex flex-col justify-between absolute bg-slate-950 md:relative md:bg-transparent ">
					{toUser ? (
						<>	
							<Message listMessages={listMsg} toUserState={[toUser, setToUser]}/>
							<InputMessageText sendMsg={handleSendMessage}/>
						</>
					) : (
						<div className="text-white z-10">
							começe escolhendo um usuario para enviar menssagem
						</div>
					)}
				</div>
			): null}	
        </div>
    )
}
