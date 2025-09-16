import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { listUsers} from "@/services/webService";
import { userPictureInterface } from "@/types";

export default function ListUsers() {
    const [listUsersData, setListUsersData] = useState<userPictureInterface[]>([]);

    const fetchListUsers = async () => {
        setListUsersData(await listUsers());

        console.log(listUsersData);
    }

    return (
        <View>
            <Text
                className="text-white"
            >
                Texto
            </Text>

            <TouchableOpacity
                className="mt-56"
                onPress={fetchListUsers}
            >
                <Text className="text-white">
                    Precione
                </Text>
            </TouchableOpacity>

        </View>
    )
}