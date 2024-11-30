import React from "react";
import {messageInterface} from "../../data/@types/userData";

interface MessageProps {
	listMessages: messageInterface[]
}

export default function Message({listMessages}:MessageProps) {
	console.log(listMessages);
	return (
		<div className="text-white">
			menssagem aqui
		</div>
	)
}