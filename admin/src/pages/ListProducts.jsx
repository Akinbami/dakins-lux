import { useEffect, useState } from "react";
import { BACKEND_URL, CURRENCY } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import ProductListSkeleton from "../components/skeleton/ProductListSkeleton";

const ListProducts = ({ token }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchlist = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/products`);

      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        setList(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false); // Set loading to false after fetching products
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/products/${id}`, {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchlist();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchlist();
  }, []);
  return (
    <div>
      <p className="mb-2">All product list</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {isLoading ? (
          // Display skeleton loaders while loading
          <ProductListSkeleton />
        ) : (
          list.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center py-1 px-2 border text-sm"
            >
              <img
                className="w-12 md:w-20"
                src={product.images[0]}
                alt={product.name}
              />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>
                {CURRENCY}
                {product.price}
              </p>
              <p
                className="text-right md:text-center cursor-pointer text-lg"
                onClick={() => removeProduct(product._id)}
              >
                X
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListProducts;
