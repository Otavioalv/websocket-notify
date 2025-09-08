import { Text, TouchableOpacity, View } from "react-native";
import React from "react";



export type ButtomFormProps = {
    textBtt: string,
    callableBtt: () => Promise<void>
}

export default function ButtomForm({textBtt, callableBtt}: ButtomFormProps) {
    return (
        <TouchableOpacity
            className="bg-white p-5 rounded-lg"
            onPress={callableBtt}
        >
            <Text
                className="text-violet-600 text-center text-2xl"
            >
                {textBtt}
            </Text>
        </TouchableOpacity>
    )
}