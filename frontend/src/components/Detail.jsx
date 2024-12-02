import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
export default function Detail() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const {id} = useParams()

  const GetItem =async()=>{
    try{
      const response = await fetch(`http://localhost:3000/v1/api/product/${id}`)
      const result = await response.json()
      console.log(result)
      setLoading(true)
      if(response.ok){
        setLoading(false)
        setData(result.item)
      }
    }catch(err){
      setError(err)
    }
  }
  useEffect(()=>{
    GetItem()
  },[])

  return (
    <div className='flex mx-10 gap-5 my-10 flex-col lg:flex-row h-full'>
        <div className="img  h-[500px] w-full flex col-span-5">
            <img src={data.imageUrl} className='rounded-2xl w-full mx-auto' alt="" />
        </div>
        <div className="content  h-[500px] w-full md:pl-20 text-center space-y-2">
            <h1 className='text-3xl mt-5 md:mt-0'>{data.name}</h1>
            <p className='text-xl pt-10 pb-2 md:pb-10 text-gray-500'>{data.description}</p>
            <p className='text-2xl text-center md:my-20 font-bold'><i className="fa-solid fa-indian-rupee-sign"></i>{data.price}</p>
            <div className="btn flex gap-5 justify-center mt-2 md:mt-10 py-2 md:py-10">
                <button className='bg-gray-600 px-8 md:px-14 py-3 text-xl text-white rounded-xl hover:bg-slate-700'>Buy Now</button>
                <button className='bg-gray-600 px-14 py-3 text-xl text-white rounded-xl'>Buy Now</button>
                
            </div>
        </div>
      
    </div>
  )
}
