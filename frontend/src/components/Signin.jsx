import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { emailAtom, errorAtom, messageAtom, passwordAtom } from '../atoms/Atoms'
import { BackendUrl } from '../Provider'

export default function Signin() {
  const [email, setEmail] = useRecoilState(emailAtom)
  const [password, setPassword] = useRecoilState(passwordAtom)
  const setMessage = useSetRecoilState(messageAtom)
  const [error, setError] = useRecoilState(errorAtom)
  const backendUrl = BackendUrl
  const navigate = useNavigate()

  const Login=async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch(`${backendUrl}/v1/api/user/signin`,{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({email, password})
      })
      const result = await response.json()
      if(response.ok){
        setEmail("")
        setPassword("")
        setError("")
        setMessage(result.message)
        setTimeout(() => {
          setMessage("")
          navigate("/")
        }, 2000);
      }else{
        setEmail("")
        setPassword("")
        setError(result.message)
        setTimeout(() => {
          setError("")
        }, 2000);
      }
    }catch(error){
      setError(error.message)
    }
  }
  return (
    <>
     <div className='h-screen'>
      {error && <h1 className='text-xl bg-red-600 w-72 py-1 text-white rounded-xl my-5 mx-auto text-center '>{error}</h1> }
      
        <div className='w-auto md:w-[600px] mx-auto my-10 bg-white rounded-2xl'>
            <h1 className='text-2xl text-center py-5'>Signin</h1>
            <div className="border-b-2"></div>
            <div className='p-10'>
                <h1 className='pb-5 text-2xl'>Welcome to IPL</h1>
                <div>
                    <form onSubmit={Login}>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" className='w-full p-3.5 rounded-t-lg  hover:rounded-lg border-b-0  border-2 ' placeholder='Email' />
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className='w-full p-3.5 rounded-b-lg hover:rounded-lg border-2 ' placeholder='Password' />
                    <h1 className='py-3'>Create an account,   <a href="/register" className='underline'>Register</a></h1>
                    <button type='submit' className='bg-red-600 text-xl text-white w-full p-3 my-2 rounded-xl hover:bg-red-700'>Signin</button>
                    </form>
                </div>
            </div>
        </div>
        </div> 
    </>
  )
}
