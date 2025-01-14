import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { BackendUrl } from "../Provider";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errorAtom, hambergAtom, messageAtom } from "../atoms/Atoms";

export default function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isHamberg, setIsHamber] = useRecoilState(hambergAtom);
  const [message, setMessge] = useRecoilState(messageAtom);
  const setError = useSetRecoilState(errorAtom);
  const backendUrl = BackendUrl;
  const Logout = async () => {
    try {
      const response = await fetch(`${backendUrl}/v1/api/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setMessge(result.message);
        setError("");
        setTimeout(() => {
          setMessge("");
        }, 2000);
      }else{
        setError(result.message)
      }
    } catch (err) {
      setError(err.message);
    }
  };
  function Hamberg() {
    setIsHamber(!isHamberg);
  }
  return (
    <>
      <nav className="w-full  py-6 text-xl bg-white flex justify-between pl-5 sm:px-20 shadow-md">
        <div className="logo flex gap-5">
          <NavLink to={"/"}>
            <img src="/logo.png" height={50} width={50} alt="" />
          </NavLink>
          <NavLink to={"/products"} className="hidden sm:block">
            Accessories
          </NavLink>
        </div>
        <div className="personal  gap-2 hidden sm:flex">
          <i className="fa-solid fa-user mt-1 mr-2"></i>
          {isAuthenticated ? (
            <>
              <button onClick={Logout}>Logout</button>
              <NavLink to={"/cart"}>
                <i className="fa-solid fa-cart-shopping mt-1"></i>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/signin"}>Login</NavLink>
              <NavLink to={"/register"}>Signup</NavLink>
            </>
          )}
        </div>
        <div className="hamberg sm:hidden mr-7 text-2xl">
          {isHamberg ? (
            <button onClick={Hamberg}>
              {" "}
              <i className="fa-solid fa-bars"></i>
            </button>
          ) : (
            <button onClick={Hamberg}>
              {" "}
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </div>
      </nav>
      {message && (
        <h1 className="text-xl bg-green-600 w-72 py-1 text-white rounded-xl my-5 mx-auto text-center ">
          {message}
        </h1>
      )}
     
      {!isHamberg ? (
        <>
          <div className="hamberg-menu bg-white w-72 flex absolute right-5 mx-5  sm:hidden my-3 rounded-xl py-3 ">
            <div className="items w-full">
              {isAuthenticated ? (
                <>
                  <button className="w-full hover:bg-gray-500 py-2 text-center text-xl">
                    <Link to={"/cart"}>
                      <i className="fa-solid fa-cart-shopping mt-1"></i>Cart
                    </Link>
                  </button>
                  <button
                    onClick={Logout}
                    className="w-full hover:bg-red-500 py-2 text-center text-xl text-red-600 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className="w-full hover:bg-green-500 hover:text-white py-2 text-center text-xl">
                    <Link to={"/signin"}>Login</Link>
                  </button>
                  <button className="w-full hover:bg-gray-500 py-2 text-center text-xl">
                    <Link to={"/register"}>Register</Link>
                  </button>
                  <button className="w-full hover:bg-gray-500 py-2 text-center text-xl">
                    <Link to={"/products"}>Accessories</Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
