"use client"
import { useState } from "react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function FormContainer() {
    const client = new QueryClient()
    const [isLogin, setIsLogin] = useState(true)
    return (
        <QueryClientProvider client={client}>
            {isLogin ? <LoginForm changeState={setIsLogin} /> : <RegisterForm changeState={setIsLogin} />}
        </ QueryClientProvider>
    )

}
