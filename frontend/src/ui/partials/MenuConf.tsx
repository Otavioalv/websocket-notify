import React, {useRef, useState} from "react";
import { FaGear } from "react-icons/fa6";
import { Router } from "react-router-dom";


export default function MenuConf() {
    const dropDownRef = useRef<HTMLUListElement | null>(null);
    const [checkedConf, setCheckedConf] = useState<boolean>(true);
    const [opcList, setOpcList] = useState<Record<string, string>>({"Usuário": "/edit-user"}); // key e value, value e a opção de pagina


    const handleDropDown = async () => {
		if(!dropDownRef.current)
			return;

		checkedConf ? dropDownRef.current.style.maxHeight = "100vh": dropDownRef.current.style.maxHeight = "0px";
		setCheckedConf(!checkedConf);
	}

    return (
        <div className="w-full p-3">
            <div className="flex justify-end items-end gap-2 flex-col  relative">
                <label htmlFor="config-user" className="w-6 h-6">
                    <FaGear className="w-full h-full text-white "/>
                    <input 
                        className="hidden"
                        type="checkbox" 
                        id="config-user"
                        onChange={handleDropDown}
                        checked={checkedConf}
                    />
                </label>

                <ul 
                    className={`flex flex-col absolute translate-y-full text-white min-w-36 overflow-hidden transition-all rounded-xl ${!checkedConf ? "border" : ""}`} 
                    ref={dropDownRef}
                    style={{maxHeight: "0px"}}
                >
                    {   
                        Object.entries(opcList).map(([value, key], i) => (
                            <li className="bg-slate-950  transition flex" key={`${value}-${i}`}>

                                <a href={key} className={`w-full h-full p-2 text-right hover:bg-violet-600/20 cursor-pointer ${!checkedConf && i !== Object.entries(opcList).length - 1 ? "border-b border-violet-500" : ""}`}>
                                    {value}
                                </a>
                            </li>
                        ))
                    }
                    
                
                </ul>
            </div>

            {/* outra lista de configs */}
        </div>

    )
}