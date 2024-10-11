import React from "react";
import {textFieldProps} from "../../../data/@types/inputs";

export default function TextField({dataInfo}: {dataInfo: textFieldProps}) {
    return (
        <div className="w-full">
            <label 
                htmlFor={dataInfo.name}
                className="absolute"
            >

            </label>
            <input 
                type={dataInfo.type} 
                name={dataInfo.name} 
                id={dataInfo.name}
                placeholder={dataInfo.name[0].toUpperCase() + dataInfo.name.substring(1)}
                className="text-sm p-4 w-full bg-slate-950 border focus:outline-none focus:border-purple-900 border-slate-700 rounded-md"
            />
        </div>
    )
}