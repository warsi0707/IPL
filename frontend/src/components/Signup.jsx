import React from 'react'

export default function Signup() {
  return (
    <>
     <div className='h-screen'>
    <h1 className='rounded-xl text-xl text-center my-2 py-2 text-white w-96 mx-auto bg-green-300 '>message </h1>
    <div className='w-auto md:w-[600px] mx-auto my-10 bg-white rounded-2xl'>
        <h1 className='text-2xl text-center py-5'>Register </h1>
        <div className="border-b-2"></div>
        <div className='p-10'>
            <h1 className='pb-5 text-2xl'>Welcome to IPL</h1>
            <div>
                <form onSubmit={Signup}>
                <input  type="text" className='w-full p-3.5 rounded-t-lg  hover:rounded-lg border-b-0  border-2 ' placeholder='Username' />
                <input  type="text" className='w-full p-3.5  hover:rounded-lg border-2 ' placeholder='Email' />
                <input  type="text" className='w-full p-3.5 rounded-b-lg hover:rounded-lg border-2 ' placeholder='Password' />
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
