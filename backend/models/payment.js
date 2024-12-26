import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "pending",
    },
    reference: {
      type: String,
      required: true,
    },
    authorizationUrl: {
      type: String,
      required: false,
    },
    accessCode: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: false,
    },
  },
  { minimize: false, timestamps: true }
);

const paymentModel =
  mongoose.models.payment || mongoose.model("payment", paymentSchema);

export default paymentModel;
