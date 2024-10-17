import React from "react";

import {FaUser, FaLock, FaLockOpen} from 'react-icons/fa';
import InputField from "../components/inputs/InputField";
import Button from "../components/inputs/Button";

export default function Form () {
    return (
        <div className="bg-slate-900 flex justify-center items-center  w-full h-full m-0 p-0  text-white">
            {/* w-1/4 */}
            <form className="flex flex-col gap-6 p-5 w-96 max-w-96 border border-violet-500/45 rounded-lg">
                
                <InputField dataInfo={{name: "username", type: "text", icon: FaUser}}/>
                <InputField dataInfo={{name: "password", type: "password", icon: FaLock, altIcon: FaLockOpen}}/>
                
                {/* <div>
                    <input type="text" />
                    <label htmlFor=""></label>
                    <a href=""></a>
                </div> */}

                No account? Sing up!

                <Button name='LOGIN'/>
            </form>
        </div>
    )
}