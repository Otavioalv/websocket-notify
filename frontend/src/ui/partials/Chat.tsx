import React, {useEffect} from "react";
import ListUsers from "./ListUsers";

export default function Chat() {
    useEffect(() => {
    }, [])

    const test = (id: number) => {
        console.log(id);
    }

    return (
        <div className="flex h-full">
            <ListUsers onClick={test}/>
            <div className="text-white">
                chat
            </div>
        </div>
    )
}