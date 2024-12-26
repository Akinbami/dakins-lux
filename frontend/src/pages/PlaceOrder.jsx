import { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const {
    navigate,
    backend_url,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phoneNumber: "",
  });
  const [processing, setProcessing] = useState(false);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSuccess = async (response) => {
    console.log("payment call back", response);
    setCartItems({});
    navigate("/orders");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);

      if (!paymentMethod) {
        toast.error("Please select a payment method");
        return;
      }

      const orderItems = [];
      Object.keys(cartItems).forEach((itemId) => {
        const product = products.find((product) => product._id === itemId);
        if (product) {
          Object.keys(cartItems[itemId]).forEach((size) => {
            const quantity = cartItems[itemId][size];
            if (quantity > 0) {
              const productClone = { ...product, quantity, size };
              orderItems.push(productClone);
            }
          });
        }
      });

      const orderData = {
        items: orderItems,
        address: formData,
        totalPrice: getCartAmount() + delivery_fee,
        paymentMethod,
      };

      const response = await axios.post(`${backend_url}/orders`, orderData, {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        if (response.data.payment) {
          const popup = new PaystackPop();
          popup.resumeTransaction(response.data.payment.accessCode, {
            onSuccess: (transaction) => handleOnSuccess(transaction),
            onCancel: () => {
              console.log("User cancelled payment");
            },
            onError: (error) => {
              console.log("Error: ", error.message);
            },
          });
        } else {
          setCartItems({});
          navigate("/orders");
        }
      } else {
        toast.error(response.data.message);
      }

      setProcessing(false);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col gap-4 w-ful sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Address"
          onChange={onChangeHandler}
          name="address"
          value={formData.address}
          required
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            onChange={onChangeHandler}
            value={formData.country}
            name="country"
            required
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone number"
          onChange={onChangeHandler}
          name="phoneNumber"
          value={formData.phoneNumber}
          required
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setPaymentMethod("paystack")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "paystack" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.paystack_logo} alt="" />
            </div>
            <div
              onClick={() => setPaymentMethod("flutterwave")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "flutterwave" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.flutterwave_logo} alt="" />
            </div>
            <div
              onClick={() => setPaymentMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-center mt-8">
            <button
              className="bg-black text-white px-16 py-3 text-sm"
              type="submit"
              disabled={processing}
            >
              {processing ? (
                <>
                  <span className="pr-2">Processing...</span>
                  <FontAwesomeIcon icon={faCircleNotch} spin spinReverse />
                </>
              ) : (
                "PLACE ORDER"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
