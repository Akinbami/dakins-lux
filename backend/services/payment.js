import paymentModel from "../models/payment.js";
import PaystackStrategy from "./strategies/paystack.js";
import UnsupportedPayment from "./strategies/unsupported.js";

class PaymentService {
  constructor() {
    this.strategies = {
      paystack: new PaystackStrategy(),
      //   flutterwave: new FlutterwaveStrategy(),
    };
  }

  async processPayment(method, data) {
    const strategy = this.strategies[method] || new UnsupportedPayment();

    const response = await strategy.initializePayment(data);

    const newPayment = new paymentModel({
      orderId: data.orderId,
      amount: data.amount,
      email: data.email,
      reference: response.data.reference,
      authorizationUrl: response.data.authorization_url,
      accessCode: response.data.access_code,
    });

    const payment = await newPayment.save();

    return payment;
  }
}

export default new PaymentService();
