import React from "react";
import ListUsers from "./ListUsers";

export default function Chat() {
    return (
        <div className="flex h-full">
            <ListUsers/>
            <div className="">
                chat
            </div>
        </div>
    )
}