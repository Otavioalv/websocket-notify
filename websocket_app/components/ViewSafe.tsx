import React, { PropsWithChildren } from "react";
import { Text } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ViewSafe({children} : PropsWithChildren) {
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
