import { useRouter } from "expo-router";
import Form from "./auth/form";
import React, { useEffect } from "react";



export default function Index() {
    // Fazer verificação para login
    const router = useRouter();

    // useEffect(() => {
    //     router.navigate("/auth/set-picture");
    // }, [router])

    return <Form/>
}