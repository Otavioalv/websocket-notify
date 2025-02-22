import React, { useEffect, useState } from "react";
import { listUsers } from "../../data/services/WebsocketService";
import { userPictureInterface } from "../../data/@types/userData";
import ListPart from "../components/user/ListPart";

interface ListUsersProps {
    onClick: (user: userPictureInterface) => void,
    userSelected: userPictureInterface,
}

export default function ListUsers({onClick, userSelected}: ListUsersProps) {
    const [users, setUsers] = useState<userPictureInterface[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersList:userPictureInterface[] = await listUsers();

            setUsers(usersList);
        }

        fetchUsers();
    }, []);

    return (
        <div className="w-full text-white">
            {users.length ? (
                <div className="h-full w-full">
                    <ul className="w-full p-3 flex flex-col gap-1">
                        {
                            users.map((user:userPictureInterface, _) => (
                                <ListPart user={user} key={user.id_user} onClick={onClick} userSelected={userSelected}/>
                            ))
                        }
                    </ul>
                </div>
            ) : (
                <div>nao existe</div>
            )}
        </div>
    )
}