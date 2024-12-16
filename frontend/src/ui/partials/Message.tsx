import React from "react";
import {messageInterface} from "../../data/@types/userData";

interface MessageProps {
	listMessages: messageInterface[],
	toUser: number
}

export default function Message({listMessages, toUser}:MessageProps) {
	
	
	return (
		<div className="text-white w-full h-full flex flex-col py-2">
			{listMessages.length ? (
				<ul className="flex flex-col gap-2">
					{
						listMessages.map((msg, i) => (
							<li 
								key={i}
								className="bg-white text-black min-h-7 min-w-8 w-fit m-0 px-3 py-1 rounded-md rounded-bl-none"
							>
								{msg.message}
								
							</li>
						))
					}
				</ul>
			) : (
				<div className="h-full">
					Sem menssagens. Inicie uma conversa
				</div>
			)}				
		</div>
	)
}