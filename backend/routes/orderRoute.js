import express from "express";
import authUser from "../middleware/auth.js";
import {
  createOrder,
  listOrderForAdmin,
  listUserOrders,
  updateOrderStatus,
} from "../controllers/order.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

// Admin features
orderRouter.get("/admin", adminAuth, listOrderForAdmin);
orderRouter.put("/:orderId", adminAuth, updateOrderStatus);

// User features
orderRouter.post("/", authUser, createOrder);
orderRouter.get("/", authUser, listUserOrders);

export default orderRouter;
