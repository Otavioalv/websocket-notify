import React, {useState} from "react";
import {textFieldProps } from "../../../data/@types/inputs";


export default function InputField({dataInfo}:  {dataInfo: textFieldProps}) {
    const [showPasswd, setShowPasswd] = useState<boolean>(false);

    const toggleShowPasswd = () => {
        setShowPasswd(!showPasswd);
    }
    
    return (
        <div className="w-full border-2 flex focus-within:border-violet-500 border-white/10 rounded-lg z-10 bg-violet-600/30 backdrop-blur text-white">
            

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
    )
}