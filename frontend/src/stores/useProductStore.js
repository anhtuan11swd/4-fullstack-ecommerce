import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useProductStore = create((set, get) => ({
  createProduct: async (formData) => {
    set({ loading: true });
    try {
      const payload = { ...formData, price: Number(formData.price) };
      await axiosInstance.post("/products", payload);
      toast.success("Đã tạo sản phẩm");
      await get().fetchAllProducts();
    } catch (error) {
      const detail = error.response?.data?.errors;
      if (detail?.length) {
        const messages = detail
          .map((e) => `• ${e.field}: ${e.message}`)
          .join("\n");
        console.error("Lỗi xác thực sản phẩm:\n", messages);
        toast.error(`Dữ liệu không hợp lệ:\n${messages}`);
      } else {
        toast.error(error.response?.data?.message || "Tạo sản phẩm thất bại");
      }
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    const previous = get().products;
    set((state) => ({
      products: state.products.filter((p) => p._id !== id),
    }));
    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success("Đã xóa sản phẩm");
    } catch (error) {
      set({ products: previous });
      toast.error(error.response?.data?.message || "Xóa thất bại");
    }
  },
  featured: [],

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/products");
      set({ loading: false, products: res.data });
    } catch {
      set({ loading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/products/featured");
      set({ featured: res.data, loading: false });
    } catch {
      set({ featured: [], loading: false });
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/products/category/${category}`);
      set({ loading: false, products: res.data });
    } catch {
      set({ loading: false, products: [] });
    }
  },

  fetchRecommendations: async () => {
    try {
      const res = await axiosInstance.get("/products/recommendations");
      set({ recommendations: res.data });
    } catch {
      set({ recommendations: [] });
    }
  },
  loading: false,
  products: [],
  recommendations: [],

  toggleFeaturedProduct: async (id) => {
    try {
      const res = await axiosInstance.patch(`/products/${id}`);
      toast.success(
        res.data.isFeatured ? "Đã gắn nhãn nổi bật" : "Đã bỏ gắn nhãn nổi bật",
      );
      set((state) => ({
        featured: state.featured.map((p) =>
          p._id === id ? { ...p, isFeatured: res.data.isFeatured } : p,
        ),
        products: state.products.map((p) =>
          p._id === id ? { ...p, isFeatured: res.data.isFeatured } : p,
        ),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Thao tác thất bại");
    }
  },
}));
