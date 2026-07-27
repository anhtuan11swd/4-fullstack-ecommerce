import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore.js";
import { useUserStore } from "../stores/useUserStore.js";

export default function ProductCard({ product, index = 0 }) {
  const { user } = useUserStore();
  const { addToCart, loading } = useCartStore();
  const displayPrice = product.price?.toLocaleString("vi-VN");

  const handleAdd = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ");
      return;
    }
    addToCart(product._id);
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border transition-shadow duration-250 hover:shadow-md"
      initial={{ opacity: 0, y: 16 }}
      style={{
        background: "var(--color-paper)",
        borderColor: "var(--color-border)",
      }}
      transition={{
        delay: 0.05 * index,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {product.isFeatured && (
        <span
          className="absolute top-3 left-3 z-10 rounded-full px-2.5 py-0.5 font-semibold text-[11px] uppercase tracking-wider"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-paper)",
          }}
        >
          Nổi bật
        </span>
      )}
      <div className="aspect-square overflow-hidden">
        <img
          alt={product.name}
          className="h-full w-full object-cover transition-[transform] duration-500 group-hover:scale-105"
          loading="lazy"
          src={product.image}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <h3
          className="mb-1 font-semibold text-sm leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </h3>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span
            className="font-medium text-sm"
            style={{ color: "var(--color-accent)" }}
          >
            {displayPrice}₫
          </span>
          <button
            className={`flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2 font-medium text-xs transition-[transform,opacity] duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] active:translate-y-px sm:w-auto ${loading ? "pointer-events-none cursor-not-allowed opacity-50" : "hover:opacity-90"}`}
            disabled={loading}
            onClick={handleAdd}
            style={{
              background: "var(--color-accent)",
              color: "var(--color-paper)",
            }}
            type="button"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Thêm
          </button>
        </div>
      </div>
    </motion.div>
  );
}
