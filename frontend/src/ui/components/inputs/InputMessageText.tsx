import React from "react";

export default function InputMessageText() {
	return (
		<div className="bg-trasparent h-20 m-0 p-4 flex gap-4">
			<input 
				type="text" 
				className="w-full h-full rounded-md text-black px-6 border border-violet-400 outline-none shadow-outline"
				placeholder="Message..."
			/>
			<button 
				className="text-black h-full bg-white px-3 rounded-md cursor-pointer"
			>
				SUBMIT
			</button>
		</div>
	)
}