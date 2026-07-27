import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        price: { min: 0, required: true, type: Number },
        product: {
          ref: "Product",
          required: true,
          type: mongoose.Schema.Types.ObjectId,
        },
        quantity: { min: 1, required: true, type: Number },
      },
    ],
    stripeSessionId: { required: true, type: String, unique: true },
    totalAmount: { min: 0, required: true, type: Number },
    user: { ref: "User", required: true, type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
