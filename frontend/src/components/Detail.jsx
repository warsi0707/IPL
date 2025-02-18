import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  errorAtom,
  loadingAtom,
  messageAtom,
  productDetailAtom,
} from "../atoms/Atoms";
import { BackendUrl } from "../Provider";

export default function Detail() {
  const [data, setData] = useRecoilState(productDetailAtom);
  const setLoading = useSetRecoilState(loadingAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const [message, setMessage] = useRecoilState(messageAtom);
  const { id } = useParams();
  const navigate = useNavigate();
  const backendUrl = BackendUrl;
  const GetItem = async () => {
    try {
      const response = await fetch(`${backendUrl}/v1/api/product/${id}`);
      const result = await response.json();
      setLoading(true);
      if (response.ok) {
        setLoading(false);
        setData(result.item);
      }
    } catch (err) {
      setError(err);
    }
  };
  const AddToCart = async () => {
    try {
      const response = await fetch(`${backendUrl}/v1/api/user/items/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
          navigate("/cart");
        }, 2000);
      } else {
        setError(result.message);
        setTimeout(() => {
          setError("");
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    GetItem();
  }, []);

  return (
    <>
      {message && (
        <h1 className="text-xl bg-green-600 w-72 py-1 text-white rounded-xl my-5 mx-auto text-center ">
          {message}
        </h1>
      )}
      {error && (
        <h1 className="text-xl bg-red-600 w-72 py-1 text-white rounded-xl my-5 mx-auto text-center ">
          {error}
        </h1>
      )}

      <div className="flex mx-10 gap-5 my-10 flex-col lg:flex-row h-full">
        <div className="img  h-[500px] w-full flex col-span-5">
          <img
            src={data.imageUrl}
            className="rounded-2xl w-full mx-auto"
            alt=""
          />
        </div>
        <div className="content  h-[500px] w-full md:pl-20 text-center space-y-2">
          <h1 className="text-3xl mt-5 md:mt-0">{data.name}</h1>
          <p className="text-xl pt-10 pb-2 md:pb-10 text-gray-500">
            {data.description}
          </p>
          <p className="text-2xl text-center md:my-20 font-bold">
            <i className="fa-solid fa-indian-rupee-sign"></i>
            {data.price}
          </p>
          <div className="btn flex gap-5 justify-center mt-2 md:mt-10 py-2 md:py-10">
            <button className="bg-gray-600 px-8 md:px-14 py-3 text-xl text-white rounded-xl hover:bg-slate-700">
              Buy Now
            </button>
            <button
              onClick={AddToCart}
              className="bg-gray-600 px-14 py-3 text-xl text-white rounded-xl"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
