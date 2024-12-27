import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import cloneDeep from "lodash/cloneDeep";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isCollectionLoading, setIsCollectionLoading] = useState(true);

  const navigate = useNavigate();

  const getCartCount = () => {
    let totalCount = 0;
    for (let id in cartItems) {
      for (let size in cartItems[id]) {
        try {
          if (cartItems[id][size] > 0) {
            totalCount += cartItems[id][size];
          }
        } catch (error) {
          toast.error(error);
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => item === product._id);
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalAmount += itemInfo.price * cartItems[item][size];
          }
        } catch (error) {
          toast.error(error);
        }
      }
    }
    return totalAmount;
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    let cartData = { ...cartItems };
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          `${backend_url}/cart/add`,
          {
            itemId,
            size,
          },
          {
            headers: {
              token,
            },
          }
        );

        toast.success(
          response.data.message || "Item added to cart successfully!"
        );
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = cloneDeep(cartItems);

    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.put(
          `${backend_url}/cart/${itemId}`,
          {
            size,
            quantity,
          },
          {
            headers: {
              token,
            },
          }
        );

        toast.success(response.data.message || "Cart updated successfully");
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(`${backend_url}/products`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsCollectionLoading(false);
    }
  };

  const getCartData = async (token) => {
    try {
      const response = await axios.get(`${backend_url}/cart`, {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        setCartItems(response.data.cart);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (token) {
      getCartData(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    getCartData,
    navigate,
    token,
    setToken,
    backend_url,
    isCollectionLoading,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
