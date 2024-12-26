class UnsupportedPayment {
  async pay() {
    throw new Error("Unsupported payment method");
  }
}

export default UnsupportedPayment;
