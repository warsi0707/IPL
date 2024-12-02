import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
     <footer className='bg-purple-200 py-16 w-full md:flex items-center justify-center flex-row md:justify-evenly space-y-7 '>
        <div className="logo">
            <img src="/logo.png" className='mx-auto' width={100} height={100} alt="" />
        </div>
        <div className="links text-2xl flex flex-col gap-2 text-left">
            <Link>Contact</Link>
            <Link>About us</Link>
            <Link>More...</Link>
        </div>
        
    </footer> 
    </>
  )
}
