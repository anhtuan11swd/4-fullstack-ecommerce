import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useCartStore = create((set, get) => ({
  addToCart: async (productId) => {
    set({ loading: true });
    try {
      await axiosInstance.post("/cart", { productId });
      const res = await axiosInstance.get("/cart");
      set({ cart: res.data, loading: false });
      get().calculateTotals();
      toast.success("Đã thêm vào giỏ hàng");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Không thể thêm vào giỏ");
    }
  },

  applyCoupon: async (code) => {
    try {
      const res = await axiosInstance.post("/coupons/validate", { code });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Đã áp dụng mã giảm giá");
    } catch (error) {
      toast.error(error.response?.data?.message || "Mã giảm giá không hợp lệ");
    }
  },

  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    let total = subtotal;
    if (coupon) {
      total =
        subtotal - Math.round(subtotal * (coupon.discountPercentage / 100));
    }
    set({ subtotal, total });
  },
  cart: [],

  clearCart: () => {
    set({
      cart: [],
      coupon: null,
      isCouponApplied: false,
      subtotal: 0,
      total: 0,
    });
  },
  coupon: null,

  getCartItems: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/cart");
      set({ cart: res.data, loading: false });
      get().calculateTotals();
    } catch {
      set({ cart: [], loading: false });
    }
  },

  getMyCoupon: async () => {
    try {
      const res = await axiosInstance.get("/coupons");
      if (res.data) {
        set({ coupon: res.data, isCouponApplied: true });
        get().calculateTotals();
      }
    } catch {
      // no coupon
    }
  },
  isCouponApplied: false,
  loading: false,

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Đã hủy mã giảm giá");
  },

  removeFromCart: async (productId) => {
    set({ loading: true });
    try {
      await axiosInstance.delete("/cart", { data: { productId } });
      set((state) => ({
        cart: state.cart.filter((item) => item._id !== productId),
        loading: false,
      }));
      get().calculateTotals();
      toast.success("Đã xóa khỏi giỏ hàng");
    } catch {
      set({ loading: false });
      toast.error("Không thể xóa sản phẩm");
    }
  },
  subtotal: 0,
  total: 0,

  updateQuantity: async (productId, quantity) => {
    const nextQuantity = quantity < 1 ? 1 : quantity;
    try {
      await axiosInstance.put(`/cart/${productId}`, { quantity: nextQuantity });
      set((state) => ({
        cart: state.cart.map((item) =>
          item._id === productId ? { ...item, quantity: nextQuantity } : item,
        ),
      }));
      get().calculateTotals();
    } catch {
      // silent
    }
  },
}));
