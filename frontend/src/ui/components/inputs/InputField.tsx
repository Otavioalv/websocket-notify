import React, {useState} from "react";
import {textFieldProps} from "../../../data/@types/inputs";

export default function InputField({dataInfo}: {dataInfo: textFieldProps}) {
    const [showPasswd, setShowPasswd] = useState<boolean>(false);

    const toggleShowPasswd = () => {
        setShowPasswd(!showPasswd);
    }
    
    return (
        // bg-slate-950 border-2 focus:outline-none focus:border-purple-400 border-slate-700 rounded-lg
        <div className="w-full border-2 flex focus-within:border-violet-500 border-slate-700 rounded-lg">
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
                placeholder={dataInfo.name[0].toUpperCase() + dataInfo.name.substring(1)}
                className="focus:outline-none w-full bg-transparent pl-4"
            />
        </div>
    )
}