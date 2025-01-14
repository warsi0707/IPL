import  { createContext, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userAuthAtom, usernameAtom } from '../atoms/Atoms'
import { BackendUrl } from '../Provider'
const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isAuthenticated, setisAuthenticated] = useRecoilState(userAuthAtom)
    const username = useRecoilValue(usernameAtom)
    const backendUrl = BackendUrl
    useEffect(()=>{
        const checkAuth =async()=>{
            try{
                const response = await fetch(`${backendUrl}/v1/api/user/auth`,{
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
