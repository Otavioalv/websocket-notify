import React, { useEffect, useRef } from "react";
import {messageInterface} from "../../data/@types/userData";

interface MessageProps {
	listMessages: messageInterface[],
	toUser: number
}

export default function Message({listMessages, toUser}:MessageProps) {
	const divMessagesRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if(divMessagesRef.current)
			divMessagesRef.current.scrollTop = divMessagesRef.current.scrollHeight;
	}, [listMessages])

	return (
		<div className="text-white w-full max-h-full h-full flex flex-col py-2 overflow-auto scroll-smooth" ref={divMessagesRef}>
			{listMessages.length ? (
				<ul className="flex flex-col gap-3">
					{
						listMessages.map((msg, i) => (
							<li 
								key={i}
								className={`
									px-8
									flex
									${toUser === msg.to_user ? "justify-end": "justify-start"}
								`}
							>

								<div className={`
										bg-white
										text-black
										min-h-10 
										min-w-32
										w-fit 
										m-0 
										px-3 
										py-1 
										rounded-md 
										${toUser === msg.to_user ? "rounded-br-none": "rounded-bl-none"}	
									`}
								>
									<p
										className={`
											${toUser === msg.to_user ? "text-start": "text-end"}
										`}
									>
										{msg.message}
									</p>

									<p
										className={`
											text-[10px]
											text-gray-400
											${toUser === msg.to_user ? "text-end": "text-start"}
										`}
									>
										{new Date(msg.at_date.toString()).toLocaleString("pt-BR")}
									</p>
								</div>
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