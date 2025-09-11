// import CardContainer from "@/components/CardContainer";
import ViewSafe from "@/components/ViewSafe";
import React, { useEffect, useMemo, useState } from "react";
import { LinearGradient} from "expo-linear-gradient";
import { Text, View } from "react-native";
import BgFormAnimation from "@/components/ui/BgFormAnimation";
import InputTextForm from "@/components/Input/InputTextForm";

import { FontAwesome5 } from "@expo/vector-icons";
import ButtomForm from "@/components/Input/ButtomForm";
import { createUser, createUserType, test } from "@/services/webService";

export default function Form() {
    const textState = useState<string>("");
    const passwdState = useState<string>("");

    // useEffect(() => {
    //     console.log(textState[0]);
    //     console.log(passwdState[0]);
    // }, [textState, passwdState]);

    const fetchTest = async () => {
        console.log("TESTE: ", await test());
    }

    const fetchSingUp = async () => {
        const userData:createUserType = {
            name: textState[0],
            passwd: passwdState[0]
        };

        try {
            await createUser(userData);
        } catch(err) {
            console.log(err);
        }
    }


    return(
        <LinearGradient
        colors={["#7F22FE", "#A800B7"]}
        locations={[.3, 1]}
            className="w-full h-full"
        >   
            <BgFormAnimation/>

            <ViewSafe>
                <View className="px-6 gap-6 h-full justify-center">
                    <InputTextForm 
                        placeholder="Username"
                        textState={textState}
                        icon={
                            <FontAwesome5 name="user-alt" />
                        }
                    />
                    <InputTextForm 
                        placeholder="Password"
                        textState={passwdState}
                        hidden={true}
                        icon={
                            <FontAwesome5 name="lock" />
                        }
                        iconShow={
                            <FontAwesome5 name="lock-open" />
                        }
                                            
                    />

                    <ButtomForm 
                        textBtt="LOGIN"
                        callableBtt={fetchTest}
                    />
                    <ButtomForm 
                        textBtt="SING UP"
                        callableBtt={fetchSingUp}
                    />

                </View>
            </ViewSafe>
        </LinearGradient>
    )
}
