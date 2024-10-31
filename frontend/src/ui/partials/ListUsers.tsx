import React, { useEffect, useState } from "react";
import { listUsers } from "../../data/services/WebsocketService";
import { userData } from "../../data/@types/userData";
import ListPart from "../components/user/ListPart";

export default function ListUsers() {
    const [users, setUsers] = useState<userData[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersList:userData[] = await listUsers();
            setUsers(usersList);
        }

        fetchUsers();
    }, []);

    return (
        <div className="w-1/4 text-white">
            {users.length ? (
                <div className="h-full w-full">
                    <ul className="w-full p-3 flex flex-col gap-1">
                        {users.map((user, i) => (
                            <>
                            <ListPart user={user} key={user.id_user}/>
                            </>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>nao existe</div>
            )}
        </div>
    )
}