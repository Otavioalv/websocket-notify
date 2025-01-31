import React, {useEffect, useRef, useState} from "react";
import {messageInterface, userPictureInterface} from "../../data/@types/userData";
import ListUsers from "./ListUsers";
import Message from "./Message";
import InputMessageText from "../components/inputs/InputMessageText";
import { listMensagesService, sendMessageService } from "../../data/services/WebsocketService";
import socket from "../../data/services/SocketIOService";
import useWindowSize from "../../data/hooks/useWindowSize";
import { FaGear } from "react-icons/fa6";



export default function Chat() {
	
	const [listMsg, setListMessages] = useState<messageInterface[]>([]);
	const [toUser, setToUser] = useState<userPictureInterface>({id_picture: 0, id_user: 0, name: "", passwd: "", picture_created_at: new Date(), picture_description: "", picture_name: "", url_img: ""});
	const windowSize = useWindowSize();

	const dropDownRef = useRef<HTMLUListElement | null>(null);

    const listMessages = async (user: userPictureInterface):Promise<void> => {
        const result:messageInterface[] = await listMensagesService(user.id_user);
		setListMessages(result);
		setToUser(user);
    }
		
	const handleSendMessage = async (msg:string):Promise<void> => {
		if(msg.length)
			await sendMessageService(msg, toUser.id_user);
	}

	useEffect(() => {
		socket.on("message_from", (message: messageInterface) => {
			if(toUser.id_user === message.to_user || toUser.id_user === message.from_user)
				setListMessages([...listMsg, message]);
		});
		
		return () => {
			socket.off("message_from");
		}
	}, [listMsg, toUser, windowSize]);
	
	const handleDropDown = async () => {
		console.log("ola")

		if(dropDownRef.current)
			dropDownRef.current.style.maxHeight = "100vh";
	}

    return (
        <div className="flex h-lvh">

			<div className="md:w-1/4 w-full">
				
				<div className="w-full p-3">
					<div className="flex justify-end items-end gap-2 flex-col  relative">
						
						<button className="w-6 h-6" onClick={() => handleDropDown()}>
							<FaGear className="w-full h-full text-white "/>
						</button>

						<ul className="flex flex-col absolute -bottom-2 translate-y-full bg-white min-w-28 overflow-hidden" ref={dropDownRef}>
							<li>
								1
							</li>
							<li>
								1
							</li>
							<li>
								1
							</li>
							<li>
								1
							</li>
						
						</ul>
					</div>

					{/* outra lista de configs */}
				</div>

				<ListUsers onClick={listMessages}/>
			</div>
            
			{(windowSize.width > 768 || toUser.id_user) ? (
				// div abaixo e a sessao de menssagem, editar pra deixar ersponsivo
				<div className="w-full  md:h-lvh h-full flex flex-col justify-between absolute bg-slate-950 md:relative md:bg-transparent">
					{toUser.id_user ? (
						<>	
							<Message listMessages={listMsg} toUserState={[toUser, setToUser]} user={toUser}/>
							<InputMessageText sendMsg={handleSendMessage}/>
						</>
					) : (
						<div className="z-10 w-full h-full flex justify-center items-center">
							<p className="text-white text-lg text-center">
								Comece escolhendo um usuário para enviar mensagem
							</p>
						</div>
					)}
				</div>
			): null}	
        </div>
    )
}
