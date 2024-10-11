import React from "react";

export default function Button({name}: {name: string}) {
    return (
        <div>
            <button>{name}</button>
        </div>
    );
}