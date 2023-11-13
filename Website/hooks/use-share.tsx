import api from "@/lib/axios";
import{useEffect, useState} from "react";

export default function useShare(id: string) {
    const[users, setUsers] = useState<any>([])

    const getUsers = async (id:string)=> {
        try {
       const {data} = await api.get("/device/deviceUsers/" + id)
      setUsers(data)
        } catch (error) {
          console.log(error)
        }
          }
    useEffect(() => {
        getUsers(id)
        console.log(users)
    }, [id])

    return {users}
    }
