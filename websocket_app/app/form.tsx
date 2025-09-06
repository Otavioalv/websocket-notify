// import CardContainer from "@/components/CardContainer";
import ViewSafe from "@/components/ViewSafe";
import React from "react";
import { LinearGradient} from "expo-linear-gradient";
import { View } from "react-native";
import BgFormAnimation from "@/components/ui/BgFormAnimation";
import InputTextForm from "@/components/Input/InputTextForm";

import { FontAwesome5 } from "@expo/vector-icons";

export default function Form() {
    return(
        <LinearGradient
        colors={["#7F22FE", "#A800B7"]}
        locations={[.3, 1]}
            className="w-full h-full"
        >   
            <BgFormAnimation/>

            <ViewSafe>
                <View className="px-2 gap-6">
                    
                    
                    <InputTextForm 
                        placeholder="Username"
                        icon={
                            <FontAwesome5 name="user-alt" />
                        }
                    />

                    <InputTextForm 
                        placeholder="Password"
                        icon={
                            <FontAwesome5 name="lock" />
                        }
                    />


                </View>
                    {/* <FontAwesome5 name="lock" size={24} color="black" /> <FontAwesome5 name="lock-open" size={24} color="black" />*/}
            </ViewSafe>
        </LinearGradient>
    )
}

/* 
<TextInput
    style={styles.inputText}
    placeholder="Search Books or authors..."
    value={search}
    onChangeText={setSearch}
    
/>
*/




/* 
<div className="w-full border-2 flex focus-within:border-violet-500 
    border-white/10 rounded-lg z-10 bg-violet-600/30 backdrop-blur text-white"
>
    {dataInfo.type === 'password' ? (
        <label 
            htmlFor={dataInfo.name}
            className="flex justify-center items-center p-4 pr-0 cursor-pointer"
            onClick={toggleShowPasswd}
        >   
            {showPasswd && dataInfo.altIcon ? (
                <dataInfo.altIcon className="w-6 h-6" />
            ) : (
                <dataInfo.icon className="w-6 h-6"/>
            )}
        </label>
    ): (
        <label 
            htmlFor={dataInfo.name}
            className="flex justify-center items-center p-4 pr-0"
        >
            <dataInfo.icon className="w-6 h-6"/>
        </label>
    )}
    
    <input 
        type={dataInfo.type  === 'password' && showPasswd ? 'text' : dataInfo.type} 
        name={dataInfo.name} 
        id={dataInfo.name}
        placeholder={dataInfo.name}
        onChange={dataInfo.onChange}
        value={dataInfo.value}
        className="focus:outline-none w-full bg-transparent pl-4"
        autoComplete={dataInfo.type === "password" ? "current-password" : ""}
    />

</div>

*/