import { View, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import React, { cloneElement, ReactElement, ReactNode } from 'react';



export type InputTextFormProps = {
    placeholder: string,
    icon?: ReactElement<{name: string, size: number, color: string}>
}

export default function InputTextForm({placeholder, icon}: InputTextFormProps) {
    return(
        <View 
            className="
                flex-row border border-white rounded-lg p-2 
                items-center gap-1 z-10 bg-transparent
                backdrop-blur
            "
        >   
            {icon && cloneElement(icon, {size: 24, color: "white"})}


            <TextInput 
                placeholder={placeholder}
                className="text-white text-xl flex-1 bg-transparent"
                placeholderTextColor="#fff"
            />
        </View>
    );
}