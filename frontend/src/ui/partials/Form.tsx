import React from "react";

import TextField from "../components/inputs/TextField";
import Button from "../components/inputs/Button";

export default function Form () {
    return (
        <div className="bg-slate-900 flex justify-center items-center  w-full h-full m-0 p-0  text-white">
            <form className="flex flex-col p-0 gap-6 w-1/4">
                
                <TextField dataInfo={{name: "username", type: "text"}}/>
                <TextField dataInfo={{name: "password", type: "text"}}/>
                
                {/* <div>
                    <input type="text" />
                    <label htmlFor=""></label>
                    <a href=""></a>
                </div> */}

                <Button name='login'/>
            </form>
        </div>
    )
}