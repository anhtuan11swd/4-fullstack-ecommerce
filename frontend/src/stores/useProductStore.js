import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useProductStore = create((set) => ({
  featured: [],

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
}));
