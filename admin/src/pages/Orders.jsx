import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { BACKEND_URL, CURRENCY } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      if (!token) return;
      console.log("this is the backend url: ", BACKEND_URL, token);

      const response = await axios.get(`${BACKEND_URL}/orders/admin`, {
        headers: {
          token,
        },
      });

      console.log("orders response: ", response);
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
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
  }, [token]);

  const statusHandler = async (e, orderId) => {
    const status = e.target.value;
    try {
      const response = await axios.put(
        `${BACKEND_URL}/orders/${orderId}`,
        { status },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <p className="mb-2">All orders</p>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start p-5 border bg-gray-200 md:p-8 my-3 md:my-4 text-xm sm:text-sm text-gray-700"
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div className="">
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length) {
                    return (
                      <p key={index} className="py-0.5">
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="py-0.5">
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{`${order.address.firstName} ${order.address.lastName}`}</p>
              <div>
                <p>{order.address.address + ","}</p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order.items.length}
              </p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment Status: {order.paymentStatus ? "Done" : "Pending"}</p>
              <b>Date: {new Date(order.createdAt).toDateString()}</b>
            </div>

            <p className="text-sm sm:text-[15px]">
              {CURRENCY}
              {order.totalPrice}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
