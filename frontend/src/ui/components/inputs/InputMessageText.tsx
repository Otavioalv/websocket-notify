import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import { GoPaperAirplane } from "react-icons/go";

interface InputMessageTextProps {
	sendMsg: (msg: string) => Promise<void>
}


export default function InputMessageText({sendMsg}:InputMessageTextProps) {
	const [message, setMessage]  = useState<string>("");
	
	const handleMessage = async (e:ChangeEvent<HTMLInputElement>):Promise<void> => {
		const msg: string = e.target.value;
		setMessage(msg);
	}
	
	const handlekeyDownIpt = async (e: KeyboardEvent<HTMLInputElement>) => {
		if(e.key === "Enter") {
			await sendMsg(message);
			setMessage("");
		}
	}
		
	
	return (
		// bg-trasparent h-20 w-4/5 bottom-4 m-0 p-4 flex gap-4 text-slate-950 fixed
		<div className="bg-trasparent h-20 bottom-4 m-0 p-4 flex gap-4 text-slate-950 ">
			<input 
				type="text" 
				className="w-full h-full rounded-md px-6 border border-violet-600 outline-none shadow-outline-sm focus:shadow-outline-md"
				placeholder="Message..."
				value={message}
				onChange={handleMessage}
				onKeyDown={handlekeyDownIpt}
			/>
			<button 
				className="h-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 p-3 rounded-md cursor-pointer shadow-outline-sm hover:shadow-outline-md"
				onClick={async () => {await sendMsg(message)}}
			>
				<GoPaperAirplane className="text-white w-5 h-5"/>
			</button>
		</div>
	)
}