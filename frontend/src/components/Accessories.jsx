import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { errorAtom, loadingAtom, productAtom } from "../atoms/Atoms";
import { BackendUrl } from "../Provider";

export default function Accessories() {
  const [data, setData] = useRecoilState(productAtom);
  const setError = useSetRecoilState(errorAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const backendUrl = BackendUrl;
  const Products = async () => {
    try {
      const response = await fetch(`${backendUrl}/v1/api/product`, {
        method: "GET",
      });
      const result = await response.json();
      setLoading(true);
      if (response.ok) {
        setLoading(false);
        setData(result.products);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    Products();
  }, []);
  return (
    <div>
      <h1 className="text-center py-5 text-4xl">Products</h1>
      {loading ? (
        <h1 className="text-center text-gray-500 py-5 text-3xl">
          Loading... Please Wait
        </h1>
      ) : (
        ""
      )}
      <div className="cards grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-7 justify-items-center my-10 h-full">
        {data.map((item) => (
          <Link to={`/item/${item._id}`} key={item._id}>
            <div className="bg-gray- w-72  ">
              <div className="img">
                <img
                  src={item.imageUrl}
                  className="h-72 border-2 border-gray-400 rounded-xl shadow-lg"
                  alt=""
                />
              </div>
              <div className="content p-2">
                <h1 className="text-2xl">{item.name}</h1>
                <p>{item.description}</p>
                <p className="text-2xl font-bold text-green-500">
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {item.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
