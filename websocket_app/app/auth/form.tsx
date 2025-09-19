// import CardContainer from "@/components/CardContainer";
import ViewSafe from "@/components/ViewSafe";
import React, { useEffect, useMemo, useState } from "react";
import { LinearGradient} from "expo-linear-gradient";
import { Text, View } from "react-native";
import BgFormAnimation from "@/components/ui/BgFormAnimation";
import InputTextForm from "@/components/Input/InputTextForm";

import { FontAwesome5 } from "@expo/vector-icons";
import ButtomForm from "@/components/Input/ButtomForm";
import { createUser, createUserType, listUsers, loginUser, test } from "@/services/webService";
import { useRouter } from "expo-router";
import SetPicture from "./set-picture";

export default function Form() {
    const textState = useState<string>("");
    const passwdState = useState<string>("");
    const [formPicture, setFormPicture] = useState<boolean>(false);

    const router = useRouter();


    // useEffect(() => {
    //     console.log(textState[0]);
    //     console.log(passwdState[0]);
    // }, [textState, passwdState]);

    const handleSetFormPicture = async () => {
        setFormPicture(!formPicture);
    }

    const fetchSingUp = async () => {
        const userData:createUserType = {
            name: textState[0],
            passwd: passwdState[0]
        };

        try {
            if(await createUser(userData))
                router.navigate("/tabs/list-users");
        } catch(err) {
            console.log(err);
        }
    }

    const fetchLogin = async () => {
        const userData: createUserType = {
            name: textState[0],
            passwd: passwdState[0]
        };

        try {
            if(await loginUser(userData))
                router.navigate("/tabs/list-users");
        } catch(err) {
            console.log(err);
        }
    }



    // teste
    const fetchListUsers = async () => {
        try {
            await listUsers();
            router.navigate("/auth/set-picture");
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

                    {/* {!formPicture 
                        ? (
                            <>
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
                                    callableBtt={fetchLogin}
                                />
                                <ButtomForm 
                                    textBtt="SING UP"
                                    // callableBtt={fetchSingUp}
                                    callableBtt={handleSetFormPicture}
                                />

                                <ButtomForm 
                                    textBtt="TESTE"
                                    callableBtt={fetchListUsers}
                                />
                            </>
                        )
                        : (
                            <SetPicture/>
                        )
                    } */}
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
                        callableBtt={fetchLogin}
                    />
                    <ButtomForm
                        textBtt="SING UP"
                        callableBtt={fetchSingUp}
                    />

                    <ButtomForm 
                        textBtt="TESTE"
                        callableBtt={fetchListUsers}
                    />
                </View>
            </ViewSafe>
        </LinearGradient>
    )
}
