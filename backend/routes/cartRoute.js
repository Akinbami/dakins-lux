import express from "express";
import { addToCart, getCart, updateCart } from "../controllers/cart.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authUser, addToCart);
cartRouter.put("/:itemId", authUser, updateCart);
cartRouter.get("/", authUser, getCart);

export default cartRouter;
