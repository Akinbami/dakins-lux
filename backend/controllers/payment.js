import orderModel from "../models/order.js";
import paymentModel from "../models/payment.js";

const paystackWebhook = async (req, res) => {
  try {
    const secret = process.env.PAYSTACK_SECRET;
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash === req.headers["x-paystack-signature"]) {
      const event = req.body;
      if (event.event === "charge.success") {
        const payment = await paymentModel.findOne({
          reference: event.data.reference,
        });
        if (payment) {
          await paymentModel.findByIdAndUpdate(payment._id, {
            status: "success",
          });

          await orderModel.findByIdAndUpdate(payment.orderId, {
            status: "paid",
          });
        }
      }
    }
    return res.json({ success: true });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

export default paystackWebhook;
