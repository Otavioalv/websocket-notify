import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";



export default function SetPicture() {
    return (
        <View 
            style={{aspectRatio: 1}}
            className="items-center"
        >
            <Text className="text-white text-2xl">
                Adicionar foto usuario
            </Text>

            <TouchableOpacity 
                style={{aspectRatio: 1}}
                className="w-full h-full"
            >
                <Image
                    className="w-full h-full"
                    source={require("@/assets/images/add-image.png")}
                />
            </TouchableOpacity>
        </View>
    );
}