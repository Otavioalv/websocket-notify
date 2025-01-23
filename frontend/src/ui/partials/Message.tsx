import React, { useEffect, useRef } from "react";
import {messageInterface} from "../../data/@types/userData";
import HeaderMessage from "./HeaderMessage";
import "../styles/Message.css"



interface MessageProps {
	listMessages: messageInterface[],
	toUserState: [number, React.Dispatch<React.SetStateAction<number>>]
}

export default function Message({listMessages, toUserState}:MessageProps) {
	const divMessagesRef = useRef<HTMLDivElement | null>(null);
	const [toUser, setToUser] = toUserState;

	useEffect(() => {
		if(divMessagesRef.current)
			divMessagesRef.current.scrollTop = divMessagesRef.current.scrollHeight;
	}, [listMessages])

	return (
		<>
			<HeaderMessage setReturn={setToUser}/>


			{/* bubbles */}
			<div className="fixed w-full h-full z-0 overflow-hidden">
				{/* bubbles 1 */}
				<div className="text-black w-96 h-96 rounded-full bg-white absolute right-3/4 -top-1/4">
				</div>

				{/* bubbles 2 */}
				<div className="text-black w-16 h-16 rounded-full bg-red-200 absolute right-1/4 top-2/3">
				</div>

				{/* bubbles 3 */}
				<div className="text-black w-28 h-28 rounded-full bg-green-200 absolute left-1/3 bottom-1/2">
				</div>

				{/* bubbles 4 left-2/3 top-1/4   right-72 top-52 */}
				<div className="text-black w-44 h-44 rounded-full bg-gray-200 absolute left-2/3 top-1/4">
				</div>


				{/* bubbles 4 right-3/4 top-2/3  -left-10 bottom-10*/}
				{/* instalar nova versao taisindcss */}
				<div className="
					shadow-bubble 
					animate-floatBubble
					bg-radial-[at_50%_75%]

					from-fuchsia-600 from-30% 
					via-indigo-700 via-50% 
					to-cyan-300

					w-72 
					h-72 
					rounded-full 
					absolute 
					right-3/4 
					top-2/3">
				</div>
				
			</div>

			<div className="text-white min-w-full h-full flex flex-col py-2 overflow-auto scroll-smooth relative" ref={divMessagesRef}>


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
		</>
	)
}