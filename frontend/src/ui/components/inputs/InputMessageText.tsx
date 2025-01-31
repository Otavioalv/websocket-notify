import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import { GoPaperAirplane } from "react-icons/go";

interface InputMessageTextProps {
    sendMsg: (msg: string) => Promise<void>
}


export default function InputMessageText({sendMsg}:InputMessageTextProps) {
    const [message, setMessage]  = useState<string>("");
    
    const handleMessage = async (e:ChangeEvent<HTMLTextAreaElement>):Promise<void> => {
        const msg: string = e.target.value;
        setMessage(msg);
    }
    
    const handleSendMessage = async ():Promise<void> => {
        if(message.length >= 1 && message !== "\n")
            await sendMsg(message);
        setMessage("");
    }

    const handlekeyDownIpt = async (e: KeyboardEvent<HTMLTextAreaElement>):Promise<void> => {
        if(e.key === "Enter" && !e.shiftKey) {
            await handleSendMessage();
            e.preventDefault();
        }
    }
    
    return (
        <form className="bg-trasparent h-20 bottom-4 m-0 p-4 flex gap-4 text-slate-950 z-10 bg-violet-800">
            <textarea 
                className="w-full h-full rounded-md px-6 py-3 border border-violet-600 outline-none shadow-outline-sm focus:shadow-outline-md resize-none bg-violet-500 text-white"
                placeholder="Message..."
                value={message}
                onChange={handleMessage}
                onKeyDown={handlekeyDownIpt}
                cols={1}
                typeof="text"
            />
            <button 
                className="h-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 p-3 rounded-md cursor-pointer shadow-outline-sm hover:shadow-outline-md"
                type="reset"
                onClick={async () => {await handleSendMessage()}}
            >
                <GoPaperAirplane className="text-white w-5 h-5"/>
            </button>
        </form>
    )
}