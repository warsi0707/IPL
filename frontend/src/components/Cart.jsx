import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  errorAtom,
  loadingAtom,
  messageAtom,
  productAtom,
} from "../atoms/Atoms";
import { BackendUrl } from "../Provider";

export default function Cart() {
  const [data, setData] = useRecoilState(productAtom);
  const [message, setMessage] = useRecoilState(messageAtom);
  const setError = useSetRecoilState(errorAtom);
  const setLoading = useSetRecoilState(loadingAtom);
  const backendUrl = BackendUrl;
  const GetCart = async () => {
    try {
      const response = await fetch(`${backendUrl}/v1/api/user/carts`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      console.log(result);
      setLoading(true);
      if (response.ok) {
        setData(result.item.cart);
        setLoading(false);
      } else {
        setMessage(result.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  // const Deletitem =async(id)=>{
  //     try{
  //         const response = await fetch(`https://ipl-be.onrender.com/v1/api/user/item/${id}`,{
  //             method: "GET",
  //             credentials: "include"
  //         })
  //         const result = await response.json()
  //         if(response.ok){
  //             setMessage(result.message)
  //             setTimeout(() => {
  //                 setMessage("")
  //             }, 2000);
  //         }
  //     }catch(err){
  //         setError(err.message)
  //     }
  // }
  useEffect(() => {
    GetCart();
  }, []);
  return (
    <>
      <h1 className="text-3xl text-center py-5">Cart</h1>
      {message && (
        <h1 className="text-xl bg-green-600 w-72 py-1 text-white rounded-xl my-5 mx-auto text-center ">
          {message}
        </h1>
      )}
      {/* {error && <h1 className='text-xl bg-red-600 w-72 py-1 text-white rounded-xl my-5 mx-auto text-center '>{error}</h1> } */}
      <div className="main flex flex-col gap-10 lg:flex-row md:gap-10 mb-20">
        <div className=" w-full flex flex-col gap-5 px-5">
          {data.map((items) => (
            <div
              key={items._id}
              className="img bg-gray-100 md:h-60 w-full p-5 flex flex-col md:flex-row md:justify-between rounded-xl"
            >
              <img
                src={items.imageUrl}
                className="h-full mx-auto w-60 rounded-xl"
                alt=""
              />
              <div className="content  text-center flex flex-col justify-center space-y-2">
                <button onClick={() => delete items._id}>
                  <i className="fa-solid fa-trash flex -mt-20 justify-end md:mt-10"></i>
                </button>
                <h1 className="text-lg md:text-3xl">{items.name}</h1>
                <p>{items.description}</p>
                <p>{items.price}</p>
              </div>
            </div>
          ))}
        </div>
        {data.length === 0 ? (
          ""
        ) : (
          <>
            <div className="price bg-gray-100 h-96 w-full ">
              <button className="bg-purple-500 px-7 text-white text-2xl rounded-xl hover:bg-purple-800 py-3 flex mx-auto mt-40">
                Check Out
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
