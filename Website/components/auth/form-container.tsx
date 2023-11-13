"use client"

import { useState } from "react"

import LoginForm from "./login-form"
import RegisterForm from "./register-form"

export default function FormContainer() {
  const [isLogin, setIsLogin] = useState(true)
  if (isLogin) {
    return <LoginForm changeState={setIsLogin} />
  } else {
    return <RegisterForm changeState={setIsLogin} />
  }
}
