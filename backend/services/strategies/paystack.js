import axios from "axios";

class PaystackStrategy {
  async initializePayment(data) {
    try {
      const { email, amount } = data;
      const response = await axios.post(
        `${process.env.PAYSTACK_URL}/transaction/initialize`,
        { email, amount: amount * 100 },
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return {
        success: true,
        data: response.data?.data,
      };
    } catch (error) {
      console.error("Error initializing payment intent:", error);
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default PaystackStrategy;
