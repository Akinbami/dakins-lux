import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProducts from "./pages/AddProducts";
import Orders from "./pages/Orders";
import ListProducts from "./pages/ListProducts";
import { useState } from "react";
import Login from "./components/Login";
import { useEffect } from "react";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const CURRENCY = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route
                  path="/add-product"
                  element={<AddProducts token={token} />}
                />
                <Route
                  path="/list-products"
                  element={<ListProducts token={token} />}
                />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;