import express from "express";
import paystackWebhook from "../controllers/payment.js";

const paymentRouter = express.Router();

paymentRouter.post("/webhook", paystackWebhook);

export default paymentRouter;
