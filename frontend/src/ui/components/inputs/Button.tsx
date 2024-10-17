import React from "react";

export default function Button({name}: {name: string}) {
    return (
        <div className="bg-violet-500  hover:bg-violet-600 text-center p-4 rounded-lg cursor-pointer">
            <button className="text-slate-900 font-semibold">{name}</button>
        </div>
    );
}