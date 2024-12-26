import orderModel from "../models/order.js";
import paymentModel from "../models/payment.js";
import userModel from "../models/user.js";
import PaymentService from "../services/payment.js";

// Route for orders
const createOrder = async (req, res) => {
  try {
    const { items, paymentMethod, totalPrice, address, userId } = req.body;

    if (items && items.length === 0) {
      return res.json({ success: false, message: "No order items" });
    }

    const orderData = {
      userId,
      items,
      totalPrice,
      paymentMethod,
      paymentStatus: false,
      address,
    };

    const order = new orderModel(orderData);

    const createdOrder = await order.save();

    const user = await userModel.findByIdAndUpdate(userId, { cart: {} });

    if (paymentMethod != "cod") {
      let payment = await paymentModel.findOne({ orderId: order._id });
      if (payment) {
        return res.json({
          success: true,
          payment,
          message: "Payment already initialized",
        });
      }

      payment = await PaymentService.processPayment(paymentMethod, {
        amount: totalPrice,
        email: user.email,
        orderId: order._id,
      });

      return res.json({
        success: true,
        payment,
        message: "Payment initialized",
      });
    }

    return res.json({
      success: true,
      order: createdOrder,
      message: "Order created",
    });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

const listOrderForAdmin = async (req, res) => {
  try {
    const orders = await orderModel.find();

    return res.json({ success: true, orders, message: "Orders retrieved" });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

const listUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });

    return res.json({ success: true, orders, message: "Orders retrieved" });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(orderId, { status });

    return res.json({ success: true, order, message: "Order status updated" });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

export { createOrder, listOrderForAdmin, listUserOrders, updateOrderStatus };
