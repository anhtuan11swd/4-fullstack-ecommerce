import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import {
  addToCartSchema,
  updateQuantitySchema,
} from "../validators/cart.validator.js";

export const addToCart = async (req, res) => {
  try {
    const parsed = addToCartSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ errors, message: "Dữ liệu không hợp lệ" });
    }

    const { productId } = parsed.data;
    const user = await User.findById(req.user._id);

    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("Lỗi thêm vào giỏ hàng:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (productId) {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId,
      );
    } else {
      user.cartItems = [];
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("Lỗi xóa khỏi giỏ hàng:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const parsed = updateQuantitySchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ errors, message: "Dữ liệu không hợp lệ" });
    }

    const { quantity } = parsed.data;
    const user = await User.findById(req.user._id);

    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId,
    );

    if (!existingItem) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId,
      );
    } else {
      existingItem.quantity = quantity;
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error("Lỗi cập nhật số lượng:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productIds = user.cartItems.map((item) => item.product);

    const products = await Product.find({ _id: { $in: productIds } }).lean();

    const cartProducts = products.map((product) => {
      const item = user.cartItems.find(
        (i) => i.product.toString() === product._id.toString(),
      );
      return { ...product, quantity: item.quantity };
    });

    res.json(cartProducts);
  } catch (error) {
    console.error("Lỗi lấy giỏ hàng:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
