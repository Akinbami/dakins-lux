import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("db connected");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/dakins_lux`);
};

export default connectDB;