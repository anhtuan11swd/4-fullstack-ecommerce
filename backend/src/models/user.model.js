import bcrypt from "bcryptjs";
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
