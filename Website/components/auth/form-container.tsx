"use client"
import { useState } from "react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

export default function FormContainer() {
    const [isLogin, setIsLogin] = useState(true)
    return (
        isLogin ? <LoginForm changeState={setIsLogin} /> : <RegisterForm changeState={setIsLogin} />
    )

}
