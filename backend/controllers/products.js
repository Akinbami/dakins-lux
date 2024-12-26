import productModel from "../models/products.js";

// Route for product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      bestSeller,
      sizes,
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const images = req.files?.files?.map((img) => img.location);

    const productExist = await productModel.findOne({ name });
    if (productExist) {
      return res.json({ success: false, message: "product already exist" });
    }

    const productData = {
      name,
      description,
      price: parseFloat(price),
      category,
      subCategory,
      bestSeller: bestSeller === "true",
      sizes: JSON.parse(sizes),
      images,
    };

    const newProduct = new productModel(productData);

    const product = await newProduct.save();

    return res.json({ success: true, product, message: "product added" });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find();

    return res.json({ success: true, products });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.json({ success: false, message: "product not found" });
    }

    return res.json({
      success: true,
      message: "Product removed successfully",
      product,
    });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

const productDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.json({ success: false, message: "product not found" });
    }

    return res.json({ success: true, product });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      subCategory,
      bestSeller,
      sizes,
    } = req.body;

    const productData = {
      name,
      description,
      price: parseFloat(price),
      category,
      subCategory,
      bestSeller: bestSeller === "true",
      sizes: JSON.parse(sizes),
      images,
    };

    const product = await productModel.findByIdAndUpdate(id, productData);

    if (!product) {
      return res.json({ success: false, message: "product not found" });
    }

    return res.json({ success: true, product });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  createProduct,
  listProduct,
  removeProduct,
  productDetail,
  updateProduct,
};
