import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    cart: {
      type: Object,
      default: {},
    },
  },
  { minimize: false, timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// await userModel.collection.createIndex(
//   { phone: 1 },
//   { unique: true, partialFilterExpression: { phone: { $ne: null } } }
// );

export default userModel;
