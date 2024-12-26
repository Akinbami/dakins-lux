import { useState } from "react";
import { assets } from "../assets/assets";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../App";

const AddProducts = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [images, setImages] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Cleanup URLs created by URL.createObjectURL
    return () => images.forEach((img) => URL.revokeObjectURL(img.preview));
  }, [images]);

  const handleFileChange = (e) => {
    const validFiles = Array.from(e.target.files)
      .slice(0, 4)
      .filter((file) => ["image/jpeg", "image/png"].includes(file.type));
    const fileArray = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => {
      prev.forEach((img) => URL.revokeObjectURL(img.preview));
      return fileArray;
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      images.forEach((img) => formData.append("files", img.file));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      const response = await axios.post(`${BACKEND_URL}/products`, formData, {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);

        // Reset form state
        setName("");
        setDescription("");
        setPrice("");
        setImages([]);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("this is the error", error);
      toast.error(error.response?.data?.message || error.massage);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload image</p>

        {images.length > 0 ? (
          <div className="flex gap-2">
            {images?.map((img, index) => (
              <img
                className="w-20"
                src={img.preview}
                alt={`Uploaded preview ${index + 1}`}
                key={index}
              />
            ))}
          </div>
        ) : (
          <div>
            <label htmlFor="images">
              <img className="w-20" src={assets.upload_area} alt="" />
              <input
                onChange={handleFileChange}
                type="file"
                id="images"
                multiple
                hidden
              />
            </label>
          </div>
        )}
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write description..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            className="w-full px-3 py-2"
            name=""
            id=""
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select
            className="w-full px-3 py-2"
            name=""
            id=""
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Traditional">Traditional</option>
            <option value="English">English</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              className={`${
                sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={(e) => setBestSeller(e.target.checked)}
          checked={bestSeller}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add best seller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white"
        disabled={processing}
      >
        {processing ? "Submitting..." : "Add"}
      </button>
    </form>
  );
};

export default AddProducts;
