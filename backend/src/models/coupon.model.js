import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      required: true,
      trim: true,
      type: String,
      unique: true,
      uppercase: true,
    },
    discountPercentage: { max: 100, min: 1, required: true, type: Number },
    expirationDate: { required: true, type: Date },
    isActive: { default: true, type: Boolean },
    userId: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
    },
  },
  { timestamps: true },
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
