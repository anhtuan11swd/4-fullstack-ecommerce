import cloudinary from "../lib/cloudinary.js";
import redis from "../lib/redis.js";
import Product from "../models/product.model.js";
import { createProductSchema } from "../validators/product.validator.js";

export const updateFeaturedProductsCache = async () => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set(
      "featured_products",
      JSON.stringify(featuredProducts),
      "EX",
      3600,
    );
  } catch (error) {
    console.error("Lỗi cập nhật cache featured products:", error.message);
  }
};

export const getAllProducts = async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const getFeaturedProducts = async (_req, res) => {
  try {
    const cached = await redis.get("featured_products");
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts.length) {
      return res.status(404).json({ message: "Không có sản phẩm nổi bật" });
    }

    await redis.set(
      "featured_products",
      JSON.stringify(featuredProducts),
      "EX",
      3600,
    );
    res.json(featuredProducts);
  } catch (error) {
    console.error("Lỗi lấy sản phẩm nổi bật:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category })
      .sort({ createdAt: -1 })
      .lean();
    res.json(products);
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo danh mục:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const getRecommendedProducts = async (_req, res) => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 3 } }]);
    res.json(products);
  } catch (error) {
    console.error("Lỗi lấy sản phẩm gợi ý:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ errors, message: "Dữ liệu không hợp lệ" });
    }

    const { name, description, price, image, category } = parsed.data;

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "4-fullstack-ecommerce-admin-dashboard/products",
    });

    const product = await Product.create({
      category,
      description,
      image: uploadedImage.secure_url,
      imagePublicId: uploadedImage.public_id,
      name,
      price,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Lỗi tạo sản phẩm:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await product.deleteOne();
    res.json({ message: "Đã xóa sản phẩm thành công" });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    product.isFeatured = !product.isFeatured;
    await product.save();
    await updateFeaturedProductsCache();

    res.json(product);
  } catch (error) {
    console.error("Lỗi chuyển đổi trạng thái nổi bật:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
