// import CardContainer from "@/components/CardContainer";
import ViewSafe from "@/components/ViewSafe";
import React, { useEffect, useMemo, useState } from "react";
import { LinearGradient} from "expo-linear-gradient";
import { Text, View } from "react-native";
import BgFormAnimation from "@/components/ui/BgFormAnimation";
import InputTextForm from "@/components/Input/InputTextForm";

import { FontAwesome5 } from "@expo/vector-icons";
import ButtomForm from "@/components/Input/ButtomForm";

export default function Form() {
    const textState = useState<string>("");
    const passwdState = useState<string>("");

    // useEffect(() => {
    //     console.log(textState[0]);
    //     console.log(passwdState[0]);
    // }, [textState, passwdState]);

    const test = async () => {
        console.log("Botao apertado");
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
                        callableBtt={test}
                    />
                    <ButtomForm 
                        textBtt="SING UP"
                        callableBtt={test}
                    />

                </View>
            </ViewSafe>
        </LinearGradient>
    )
}
