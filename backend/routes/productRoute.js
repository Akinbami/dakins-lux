import express from "express";
import {
  createProduct,
  listProduct,
  productDetail,
  removeProduct,
  updateProduct,
} from "../controllers/products.js";
import upload, { handleMulterError } from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  adminAuth,
  upload.fields([{ name: "files", maxCount: 5 }]),
  handleMulterError,
  createProduct
);

productRouter.get("/", listProduct);
productRouter.get("/:id", productDetail);
productRouter.put(
  "/:id",
  adminAuth,
  upload.fields([{ name: "files", maxCount: 5 }]),
  handleMulterError,
  updateProduct
);
productRouter.delete("/:id", adminAuth, removeProduct);

export default productRouter;
