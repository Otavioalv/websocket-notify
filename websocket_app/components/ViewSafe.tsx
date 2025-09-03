import React, { PropsWithChildren } from "react";
import { Text } from "react-native";

import { SafeAreaProvider, SafeAreaProviderProps, SafeAreaView } from "react-native-safe-area-context";


// const props: SafeAreaProviderProps;

type ViewSafeProps = PropsWithChildren & SafeAreaProviderProps

export default function ViewSafe({children}: PropsWithChildren) {
    return (
        <SafeAreaProvider>
            <SafeAreaView
                edges={['top', 'bottom']}
            >
                {children}
            </SafeAreaView> 
        </SafeAreaProvider>
    )
}
