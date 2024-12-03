import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
export default function Cards() {
   const [loading, setLoading] = useState(true)
   const [data, setData] = useState([])

   const GetData =async()=>{
      const response = await fetch("https://ipl-be.onrender.com/v1/api/product/item",{
         method: "GET",
      })
      const result = await response.json()
      setLoading(true)
      if(response.ok){
         setData(result.products)
         setLoading(false)
      }
   }
   useEffect(()=>{
      GetData()
   },[])
  return (
    <>
    <h1 className='text-center py-5 text-4xl'>Products</h1>
    {loading? <h1 className='text-center text-gray-500 py-5 text-3xl'>Loading... Please Wait</h1>: "" }
   
     <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center my-10 h-full">
      {data.map((item)=>(
          <Link key={item._id} to={`/item/${item._id}`}>
          <div className='bg-gray- w-72  '>
            <div className="img">
                <img src={item.imageUrl} className='h-72 border-2 border-gray-400 rounded-xl shadow-lg' alt="" />
             </div>
             <div className="content p-2">
                <h1 className='text-2xl'>{item.name}</h1>
                <p>{item.description}</p>
                <p className='text-2xl font-bold text-green-500'><i className="fa-solid fa-indian-rupee-sign"></i>{item.price}</p>
             </div>
          </div> 
       </Link>
      ))}
      
    
    </div> 
    <Link to={"/products"} className='text-xl flex justify-end mr-20 underline text-blue-600 py-10'>All Products...</Link>
    </>
  )
}
