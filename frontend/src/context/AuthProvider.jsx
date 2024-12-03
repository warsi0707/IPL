import React, { createContext, useEffect, useState } from 'react'
const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [username, setusername] = useState("")

    useEffect(()=>{
        const checkAuth =async()=>{
            try{
                const response = await fetch("https://ipl-be.onrender.com/v1/api/user/auth",{
                    method: "GET",
                    credentials: "include"
                })  
                const result = await response.json()
                if(result.authenticated === true){
                    setisAuthenticated(true)
                }else{
                    setisAuthenticated(false)
                }
            }catch(err){
                setisAuthenticated(false)
            }
        }
        checkAuth()
    },[])
  return (
    <div>
      <AuthContext.Provider value={{ isAuthenticated, username}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}
export default AuthContext
