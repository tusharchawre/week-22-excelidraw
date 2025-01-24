"use client"

import { useEffect, useState } from "react"

interface User {
    user : {id: string;
    name: string;
    room: {
      id: string;
      roomName: string;
    }[];}
  }
  
  interface UseUserResponse {
    user: User | undefined; 
    isLoading: boolean;
    error: string | null; 
  }
  

export const useUser = () : UseUserResponse => {
    const [user, setUser] = useState()
    const [isLoading , setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchUser = async () =>{
            setIsLoading(true)
           try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_HTTP_URL}/user`, {
                method: "GET",
                headers: {
                    "authorization": `${localStorage.getItem("token")}`
                }
            })

            if(!res.ok){
                throw new Error("Something Went Wrong")
            }

            const data = await res.json()

            setUser(data)
            
           }
           catch(err : any){
           }
           finally{
            setIsLoading(false)
           }

        }

        fetchUser()
    },[])

    return {user, isLoading , error}
    
}