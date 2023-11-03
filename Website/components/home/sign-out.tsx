"use client"
import useAuth from "@/hooks/useAuth"

export default function SignOut(){
 const {handleLogOut} = useAuth()

 return <button onClick={handleLogOut}>Sign Out</button>

}
