import React from 'react'
import {Link, NavLink} from "react-router-dom"


export default function Navbar() {
  return (
    <>
    <nav className='w-full  py-6 text-xl bg-white flex justify-between px-20 shadow-md'>
      <div className="logo flex gap-5">
        <NavLink to={"/"}><img src="/logo.png"height={50} width={50} alt="" /></NavLink>
        <NavLink to={"/products"}>Accessories</NavLink>
      </div>
      <div className="personal flex gap-2">
      <i className="fa-solid fa-user mt-1 mr-2"></i>
        <NavLink>Login</NavLink>
        <NavLink to={"/register"}>Signup</NavLink>
        <NavLink>Logout</NavLink>
        <NavLink><i className="fa-solid fa-cart-shopping mt-1"></i></NavLink>
      </div> 
     
    </nav>
    </>
  )
}
