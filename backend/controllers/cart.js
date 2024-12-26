import userModel from "../models/user.js";

// Route for cart
const addToCart = async (req, res) => {
  try {
    const { itemId, size, userId } = req.body;

    if (!size) {
      return res.json({ success: false, message: "Select product size" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Initialize cart if undefined
    let cartData = userData.cart || {};

    // Initialize itemId in cart if undefined
    cartData[itemId] = cartData[itemId] || {};

    // Increment or initialize size count
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    // Update the user's cart
    await userModel.findByIdAndUpdate(userId, { cart: cartData });

    // Respond to the client
    return res.json({
      success: true,
      message: "Item added to cart",
      cart: userData.cart,
    });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { size, quantity, userId } = req.body;

    if (!Number.isInteger(quantity) || quantity < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid quantity" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Initialize cart if undefined
    let cartData = userData.cart || {};

    // Ensure cart structure is correctly initialized
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = quantity;

    // Update the user's cart
    await userModel.findByIdAndUpdate(userId, { cart: cartData });

    // Respond to the client
    return res.json({
      success: true,
      message: "Cart updated",
      cart: userData.cart,
    });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, cart: userData.cart });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getCart };
