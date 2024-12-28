import React from "react";
import {messageInterface} from "../../data/@types/userData";

interface MessageProps {
	listMessages: messageInterface[],
	toUser: number
}

export default function Message({listMessages, toUser}:MessageProps) {
	return (
		<div className="text-white w-full max-h-full h-full flex flex-col py-2 overflow-auto">
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
								<p
									className="
										bg-white
										text-black
										min-h-7 
										min-w-8 
										w-fit 
										m-0 
										px-3 
										py-1 
										rounded-md 
										rounded-bl-none
									"
								>
									{msg.message}
								</p>
								
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