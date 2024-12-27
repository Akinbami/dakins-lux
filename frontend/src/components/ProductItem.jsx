import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

function ProductItem({ id, images, name, price }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { currency } = useContext(ShopContext);
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden h-64" ref={ref}>
        {inView && (
          <img
            className="hover:scale-110 transition ease-in-out w-full h-full object-cover"
            src={images[0]}
            alt=""
          />
        )}
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
}

export default ProductItem;
