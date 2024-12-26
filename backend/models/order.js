import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.order || mongoose.model("Order", orderSchema);

export default orderModel;
