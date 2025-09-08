import { View, TextInput, TouchableOpacity } from "react-native";
import React, { cloneElement, ReactElement, useEffect, Dispatch, SetStateAction, useState } from 'react';

export type InputTextFormProps = {
    placeholder: string,
    textState: [string, Dispatch<SetStateAction<string>>],
    icon?: ReactElement<{name: string, size: number, color: string}>,
    iconShow?: ReactElement<{name: string, size: number, color: string}>, 
    hidden?: boolean,
}

export default function InputTextForm({placeholder, icon, iconShow, textState, hidden=false}: InputTextFormProps) {
    const [textInput, setTextInput] = textState;
    const [changeHidden, setChangeHidden] = useState<boolean>(hidden);

    const handleSetChangeHidden = () => {
        setChangeHidden(!changeHidden);
    }


    useEffect(() => {
        console.log(textInput);
    }, [textInput]);

    return(
        <View 
            className="
                flex-row border-2 border-white rounded-lg p-2 
                items-center gap-1 z-10 bg-transparent
                backdrop-blur
            "
        >   
            <TouchableOpacity 
                disabled={!hidden}
                onPress={() => handleSetChangeHidden()}
            >
                {   
                    icon && !hidden
                        ? cloneElement(icon, {size: 24, color: "white"})
                        : changeHidden && icon
                            ? cloneElement(icon, {size: 24, color: "white"})
                            : iconShow && cloneElement(iconShow, {size: 24, color: "white"})
                }
            </TouchableOpacity>

            <TextInput 
                placeholder={placeholder}
                className="text-white text-xl flex-1 bg-transparent"
                placeholderTextColor="#fff"
                value={textInput}
                secureTextEntry={changeHidden}
                onChangeText={setTextInput}
            />
        </View>
    );
}