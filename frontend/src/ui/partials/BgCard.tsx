import React from "react";

export default function BgCard() {
    return (
        <>
            <div className="absolute z-0  w-[640px] h-[800px] rounded-[40%] left-0 top-0 ml-[-30%] mt-[-47%] bg-gradient-to-r from-violet-600/90 to-violet-800/90 animate-spin-3s"></div>
            <div className="absolute z-0  w-[640px] h-[800px] rounded-[40%] left-0 top-24 -ml-3 bg-gradient-to-r from-violet-600/90 to-violet-800/90 animate-spin-4s"></div>
            <div className="absolute z-0  w-[640px] h-[800px] rounded-[40%] -left-10 mt-[5%] top-32 -ml-3 bg-gradient-to-r from-violet-600/90 to-violet-800/90 animate-spin-5s"></div>
        </>
    );
}