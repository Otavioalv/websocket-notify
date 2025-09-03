import { Text, View } from "react-native";
import React, { PropsWithChildren } from "react";


// Card de formulario
export default function CardContainer({children}: PropsWithChildren) {
    return (

        <View className="h-full  justify-center items-center px-4">
            <View className="bg-violet-600 rounded-lg overflow-hidden min-w-full p-3">
                {/* bg Card */}
                {children}
            </View>
        </View>
    )
}


/* 

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


*/