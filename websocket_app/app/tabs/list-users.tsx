import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { listUsers} from "@/services/webService";
import { userPictureInterface } from "@/types";

export default function ListUsers() {
    const [listUsersData, setListUsersData] = useState<userPictureInterface[]>([]);

    const fetchListUsers = useCallback( async () => {
        setListUsersData(await listUsers());
        // console.log(listUsersData);
    }, []);

    useEffect(() => {
        fetchListUsers();
    }, [fetchListUsers]);

    return (
        <View>
            {
                listUsersData.map((user, i) => (
                    <View
                        key={i}
                    >   

                        <View>
                            <Image
                                className="w-20 h-20"
                                source={{uri: `https://robohash.org/${user.name}-${user.id_user}`}}
                            />
                        </View>
                        
                        <View>
                            <Text className="text-white">
                                {user.name}
                            </Text>
                        </View>
                    </View>
                ))
            }
        </View>
    )
}