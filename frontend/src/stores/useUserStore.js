import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
};

export const useUserStore = create((set) => ({
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/profile");
      set({ checkingAuth: false, user: res.data });
    } catch {
      set({ checkingAuth: false, user: null });
    }
  },
  checkingAuth: true,
  loading: false,

  login: async (formData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      set({ loading: false, user: res.data });
      toast.success("Chào mừng trở lại");
      return res.data;
    } catch (error) {
      set({ loading: false });
      const msg =
        error.response?.data?.message ||
        "Đã xảy ra lỗi trong quá trình đăng nhập";
      toast.error(msg);
      throw error;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("Đã đăng xuất");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Đã xảy ra lỗi trong quá trình đăng xuất";
      toast.error(msg);
    }
  },

  signup: async (formData) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      set({ loading: false, user: res.data });
      toast.success("Tạo tài khoản thành công");
      return res.data;
    } catch (error) {
      set({ loading: false });
      const msg =
        error.response?.data?.message ||
        "Đã xảy ra lỗi trong quá trình đăng ký";
      toast.error(msg);
      throw error;
    }
  },
  user: null,
}));

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/login" &&
      originalRequest.url !== "/auth/refresh-token" &&
      originalRequest.url !== "/auth/logout"
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ reject, resolve });
        }).then(() => axiosInstance(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/refresh-token");
        processQueue();
        return axiosInstance(originalRequest);
      } catch {
        processQueue();
        useUserStore.setState({ user: null });
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
