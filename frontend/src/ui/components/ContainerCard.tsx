import React from "react";
import BgCard from "../partials/BgCard";

interface ContainerProps {
    children: React.ReactNode;
}

const ContainerCard: React.FC<ContainerProps> = ({children}) => {
    return (
        <div className="flex justify-center items-center h-lvh">
            <div className="overflow-hidden relative bg-violet-600 rounded-lg">
                <BgCard/>
                {children}
            </div>
        </div>
    );
}

export default ContainerCard;

