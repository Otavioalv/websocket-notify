import { Stack } from "expo-router";
import React from "react";


export default function TabsLayout() {
    return(
        <Stack
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen name="list-users"/>
        </Stack>
    )
}