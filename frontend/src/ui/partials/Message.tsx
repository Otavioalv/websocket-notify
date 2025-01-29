import React, { useEffect, useRef } from "react";
import {messageInterface, userPictureInterface} from "../../data/@types/userData";
import HeaderMessage from "./HeaderMessage";
import "../styles/Message.css"



interface MessageProps {
	listMessages: messageInterface[],
	toUserState: [userPictureInterface, React.Dispatch<React.SetStateAction<userPictureInterface>>]
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
			<HeaderMessage setReturn={setToUser} user={toUser}/>


			{/* bubbles */}
			<div className="fixed w-full h-full z-0 overflow-hidden">
				{/* bubbles 1 */}
				<div className=" 
					shadow-bubble 
					animate-floatBubble-5
					bg-custon-bubble-5

					w-96 
					h-96 
					rounded-full 
					absolute 
					right-3/4 
					-top-1/4"
					>
				</div>

				{/* bubbles 2 */}
				<div className="
					shadow-bubble 
					animate-floatBubble-4
					bg-custon-bubble-4

					w-16 
					h-16 
					rounded-full 
					absolute 
					right-1/4 
					top-2/3"
					>
				</div>

				{/* bubbles 3 */}
				<div className="
					z-20
					shadow-bubble 
					animate-floatBubble-3
					bg-custon-bubble-3

					w-28 
					h-28 
					rounded-full 
					absolute 
					left-1/3 
					bottom-1/2"
					>
				</div>

				{/* bubbles 4 left-2/3 top-1/4   right-72 top-52 */}
				<div className="
					z-20
					shadow-bubble 
					animate-floatBubble-2
					bg-custon-bubble-2
					
					w-44
					h-44 
					rounded-full
					absolute 
					left-2/3 
					top-1/4"
					>
				</div>


				{/* bubbles 4 right-3/4 top-2/3  -left-10 bottom-10*/}
				{/* instalar nova versao taisindcss */}
				<div className="
					shadow-bubble 
					animate-floatBubble-1
					bg-custon-bubble-1 

					w-72 
					h-72 
					rounded-full 
					absolute 
					right-3/4 
					top-2/3"
					>
				</div>

				{/* line bubble 1*/}
				<div
					className="
						z-10
						border
						border-white
						animate-floatBubble-2
						w-[40em] 
						h-[40em] 
						rounded-full 
						absolute 
						right-[60%] 
						top-[30%]
					"
				>
				</div>


				{/* line bubble 2*/}
				<div
					className="
						z-10
						border
						border-white
						animate-floatBubble-4
						w-[50em] 
						h-[50em] 
						rounded-full 
						absolute 
						right-[10%] 
						bottom-[60%]
					"
				></div>
				
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
										${toUser.id_user === msg.to_user ? "justify-end": "justify-start"}
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
											${toUser.id_user === msg.to_user ? "rounded-br-none": "rounded-bl-none"}	
										`}
									>
										<p
											className={`
												${toUser.id_user === msg.to_user ? "text-start": "text-end"}
											`}
										>
											{msg.message}
										</p>

										<p
											className={`
												text-[10px]
												text-gray-400
												${toUser.id_user === msg.to_user ? "text-end": "text-start"}
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
					<div className="h-full flex justify-center items-center">
						<p className="text-white text-center text-lg">
							Sem mensagens. Inicie uma conversa
						</p>
					</div>
				)}		
			</div>
		</>
	)
}