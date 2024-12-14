import React, {useState, useEffect} from "react";
import {messageInterface} from "../../data/@types/userData";
import InputMessageText from "../components/inputs/InputMessageText";

interface MessageProps {
	listMessages: messageInterface[],
	toUser: number
}

export default function Message({listMessages, toUser}:MessageProps) {
	
	
	return (
		<div className="text-white w-full h-full flex flex-col py-2">
			{listMessages.length ? (
				<ul>
					{
						listMessages.map((msg, i) => (
							<li key={i}>
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