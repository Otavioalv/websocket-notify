import React, {useState} from "react";
import {messageInterface} from "../../data/@types/userData";
import InputMessageText from "../components/inputs/InputMessageText";

interface MessageProps {
	listMessages: messageInterface[]
}

export default function Message({listMessages}:MessageProps) {
			
	
	return (
		<div className="text-white w-full h-full flex flex-col py-2">
			{listMessages.length ? (
				<div>
					menssagens existe
				</div>
			) : (
				<div className="h-full">
					Inicie uma conversa
				</div>
			)}				
		</div>
	)
}