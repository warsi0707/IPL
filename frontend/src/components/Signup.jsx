import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const Register =async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch("https://ipl-be.onrender.com/v1/api/user/register",{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, name, password})
      })
      const result = await response.json()
      console.log(result)
      if(response.ok){
        setMessage(result.message)
        setEmail("")
        setName("")
        setPassword("")
        setError("")
        setTimeout(() => {
          setMessage("")
          navigate("/signin")
        }, 2000);
      }else{
        setError(result.message)
        setTimeout(() => {
          setError("")
        }, 2000);
      }
    }catch(err){
      setError(err)
    }
  }

  return (
    <>
     <div className='h-screen'>
     {message && (<h1 className='text-xl bg-green-600 w-72 py-1 text-white rounded-xl my-5 mx-auto text-center '>{message}</h1>)}
     {error && <h1 className='text-xl bg-red-600 w-72 py-1 text-white rounded-xl my-5 mx-auto text-center '>{error}</h1> }
    <div className='w-auto md:w-[600px] mx-auto my-10 bg-white rounded-2xl'>
        <h1 className='text-2xl text-center py-5'>Register </h1>
        <div className="border-b-2"></div>
        <div className='p-10'>
            <h1 className='pb-5 text-2xl'>Welcome to IPL</h1>
            <div>
                <form onSubmit={Register} >
                <input value={email} onChange={(e)=> setEmail(e.target.value)}  type="text" className='w-full p-3.5  hover:rounded-lg border-2 ' placeholder='Email' />
                <input value={name} onChange={(e)=> setName(e.target.value)}   type="text" className='w-full p-3.5  hover:rounded-lg border-2 ' placeholder='Name' />
                <input value={password} onChange={(e)=> setPassword(e.target.value)}  type="password" className='w-full p-3.5 rounded-b-lg hover:rounded-lg border-2 ' placeholder='Password' />
                <h1 className='py-3'>Already an account,   <a href="/signin" className='underline'>Login</a></h1>
                <button type='submit' className='bg-red-600 text-xl text-white w-full p-3 my-2 rounded-xl hover:bg-red-700'>Register</button>
                </form>
            </div>
        </div>
    </div>

</div>
    </>
  )
}

