import React, { useEffect, useRef } from "react";
import {messageInterface, userPictureInterface} from "../../data/@types/userData";
import HeaderMessage from "./HeaderMessage";
import "../styles/Message.css"
import BubbleBg from "./BubbleBg";



interface MessageProps {
	listMessages: messageInterface[],
	toUserState: [userPictureInterface, React.Dispatch<React.SetStateAction<userPictureInterface>>],
	user: userPictureInterface
}

export default function Message({listMessages, toUserState, user}:MessageProps) {
	const divMessagesRef = useRef<HTMLDivElement | null>(null);
	const [toUser, setToUser] = toUserState;

	useEffect(() => {
		if(divMessagesRef.current)
			divMessagesRef.current.scrollTop = divMessagesRef.current.scrollHeight;
	}, [listMessages])

	return (
		<>
			<HeaderMessage setReturn={setToUser} user={toUser}/>			
			<BubbleBg/>

			<div className="text-white min-w-full h-full flex flex-col py-2 overflow-auto scroll-smooth relative " ref={divMessagesRef}>


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
											max-w-[80%]

											m-0 
											px-3 
											py-1
											rounded-lg
											${toUser.id_user === msg.to_user ? "rounded-br-none": "rounded-bl-none"}
										`}
									>

										{
											toUser.id_user !== msg.to_user ? (
												<div className="flex items-center gap-3">
													<div className="w-10 h-10 rounded-full overflow-hidden">
														<img src={user.url_img} alt={`user-chat-${user.name}`} className=""/>
													</div>
													<span>{user.name}</span>
												</div>
											) : null
										}

										<p
											className={`
												whitespace-pre-wrap
												flex
												${toUser.id_user === msg.to_user ? "justify-start ": "justify-end"}
											`}
											style={{wordBreak: "break-word"}}
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