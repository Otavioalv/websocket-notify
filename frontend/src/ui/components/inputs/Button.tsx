import React from "react";

export default function Button({name}: {name: string}) {
    return (
        <div className="bg-violet-600  hover:bg-violet-700 text-center p-4 rounded-lg cursor-pointer z-10">
            <button className="font-semibold ">{name}</button>
        </div>
    );
}