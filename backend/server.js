import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());

// Configure CORS
const allowedOrigins = [
  "https://dakins-lux-admin.vercel.app",
  "https://dakins-lux-frontend.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

connectDB();

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/payment", paymentRouter);

// api endpoints
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => console.log(`server started on port ${port}`));
