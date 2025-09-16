import { Stack } from "expo-router";
import React from "react";


export default function AuthLayout() {
    return(
        <Stack
            screenOptions={{
              headerShown: false
            }}
        >
            <Stack.Screen name="form"/>
            <Stack.Screen name="set-picture"/>
        </Stack>
    )
}