import React, {useState} from "react";
import {messageInterface} from "../../data/@types/userData";
import InputMessageText from "../components/inputs/InputMessageText";

interface MessageProps {
	listMessages: messageInterface[]
}

export default function Message({listMessages}:MessageProps) {
	
	return (
		<div className="text-white w-full">
			{listMessages.length ? (
				<div>
					Mostrar menssagem
				</div>
			) : (
				<div className="w-full h-full flex flex-col py-2">
					<div className="h-full">
						menssagens aqui
					</div>
					
					<InputMessageText/>
				</div>
			)}
		</div>
	)
}