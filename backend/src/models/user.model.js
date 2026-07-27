import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        product: { ref: "Product", type: mongoose.Schema.Types.ObjectId },
        quantity: { default: 1, type: Number },
      },
    ],
    email: {
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    name: { required: true, trim: true, type: String },
    password: { minlength: 6, required: true, type: String },
    role: { default: "customer", enum: ["customer", "admin"], type: String },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
