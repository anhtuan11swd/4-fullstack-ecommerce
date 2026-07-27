import { motion } from "framer-motion";
import { ShoppingCart, XCircle } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function PurchaseCancelPage() {
  useEffect(() => {
    toast.error("Thanh toán đã bị hủy", { id: "purchase-cancel" });
  }, []);

  return (
    <main className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          className="flex cursor-pointer items-center justify-center transition-opacity duration-150 hover:opacity-80"
          to="/cart"
        >
          <XCircle
            className="h-16 w-16"
            style={{ color: "var(--color-error)" }}
          />
        </Link>
        <h1
          className="font-bold text-2xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Thanh toán bị hủy
        </h1>
        <p className="text-sm" style={{ color: "var(--color-ink-2)" }}>
          Giao dịch của bạn chưa được hoàn tất. Không có khoản nào bị trừ.
        </p>
        <Link
          className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-2.5 font-medium text-sm transition-[opacity] duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-paper)",
          }}
          to="/cart"
        >
          <ShoppingCart className="h-4 w-4" />
          Quay lại giỏ hàng
        </Link>
      </motion.div>
    </main>
  );
}
