import { createContext, useEffect, useState} from "react"

const AuthContext = createContext()


export  function UserAuthProvider({ Children }) {
    const [authenticated, setAuthenticate] = useState(false)
    useEffect(()=>{
    const Getuser =async()=>{
        try{
            const response = await fetch("http://localhost:3000/v1/api/user/auth",{
                method: "GET",
                credentials: "include"
            })
            const result = await response.json()
            if(result.authenticated === true){
                setAuthenticate(true)
            }else{
                setAuthenticate(false)
            }
        }catch(err){
           setAuthenticate(false)
        }
    }
        Getuser()
    },[])
  return (
    <div>
      <AuthContext.Provider value={{authenticated}}>
        {Children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthContext