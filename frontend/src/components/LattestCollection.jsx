import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LattestCollection = () => {
  const { products } = useContext(ShopContext);
  const [lattestProducts, setLattestProducts] = useState([]);
  useEffect(() => {
    setLattestProducts(products.slice(0, 10));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATTEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sint
          error, aliquid qui quaerat beatae minus ipsum explicabo laudantium
          dolore non veritatis dignissimos est provident iste id corporis ab.
          Mollitia?
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {lattestProducts.map((item, index) => {
          return (
            <ProductItem
              id={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LattestCollection;
