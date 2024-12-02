import React, { useState } from 'react'
import {Link, NavLink} from "react-router-dom"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHamberg, setIsHamber] = useState(true)
  const Menu =()=>{
    setIsOpen(!isOpen)
  }
  function Hamberg(){
    setIsHamber(!isHamberg)
  }
  return (
    <>
    <nav className='w-full  py-6 text-xl bg-white flex justify-between pl-5 sm:px-20 shadow-md'>
      <div className="logo flex gap-5">
        <NavLink to={"/"}><img src="/logo.png"height={50} width={50} alt="" /></NavLink>
        <NavLink to={"/products"} className="hidden sm:block">Accessories</NavLink>
      </div>
      <div className="personal  gap-2 hidden sm:flex">
        <i className="fa-solid fa-user mt-1 mr-2"></i>
          <NavLink to={"/signin"}>Login</NavLink>
          <NavLink to={"/register"}>Signup</NavLink>
          <NavLink>Logout</NavLink>
          <NavLink><i className="fa-solid fa-cart-shopping mt-1"></i></NavLink>
      </div> 
      <div className="hamberg sm:hidden mr-7 text-2xl">
        {isHamberg?<button onClick={Hamberg}> <i className="fa-solid fa-bars"></i></button>: <button onClick={Hamberg}> <i className="fa-solid fa-xmark"></i></button>}
      </div>     
    </nav>
    {!isHamberg?<>
    <div className="hamberg-menu bg-white w-72 flex absolute right-5 mx-5  sm:hidden my-3 rounded-xl py-3 ">
      <div className="items w-full">
        <button  className='w-full hover:bg-green-500 hover:text-white py-2 text-center text-xl'><Link to={"/signin"}>Login</Link></button>
        <button  className='w-full hover:bg-gray-500 py-2 text-center text-xl'><Link to={"/register"}>Register</Link></button>
        <button  className='w-full hover:bg-gray-500 py-2 text-center text-xl'><Link to={"/products"}>Accessories</Link></button>
        <button  className='w-full hover:bg-gray-500 py-2 text-center text-xl'><Link><i className="fa-solid fa-cart-shopping mt-1"></i>Cart</Link></button>
        <button  className='w-full hover:bg-red-500 py-2 text-center text-xl text-red-600 hover:text-white'><Link>Logout</Link></button>
      </div>
    </div>
    </>:""}
    </>
  )
}
