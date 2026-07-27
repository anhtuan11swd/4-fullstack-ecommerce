import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    category: { required: true, type: String },
    description: { required: true, type: String },
    image: { required: true, type: String },
    imagePublicId: { type: String },
    isFeatured: { default: false, type: Boolean },
    name: { required: true, type: String },
    price: { min: 0, required: true, type: Number },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
