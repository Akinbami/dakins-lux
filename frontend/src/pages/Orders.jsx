import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { currency, backend_url, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      if (!token) return;
      console.log("this is the backend url: ", backend_url, token);

      const response = await axios.get(`${backend_url}/orders`, {
        headers: {
          token,
        },
      });

      console.log("orders response: ", response);
      if (response.data.success) {
        let allOtherIems = [];

        response.data.orders.map(
          (order) =>
            order.items.map((item) => {
              item["status"] = order.status;
              item["paymentStatus"] = order.paymentStatus;
              item["paymentMethod"] = order.paymentMethod;
              item["date"] = order.createdAt;

              allOtherIems.push(item);
            }) || []
        );

        console.log("all other items: ", allOtherIems);

        setOrders(allOtherIems.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orders.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.images[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment:{" "}
                  <span className="text-gray-400 uppercase">
                    {item.paymentMethod}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-between md:w-1/2">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={fetchOrders}
                className="order px-4 py-2 text-sm font-medium rounded-sm"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
