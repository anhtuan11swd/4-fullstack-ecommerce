import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios.js";
import { useCartStore } from "../stores/useCartStore.js";

export default function PurchaseSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCartStore();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const called = useRef(false);

  useEffect(() => {
    const confirm = async () => {
      if (called.current) return;
      called.current = true;
      if (!sessionId) {
        setError("Không tìm thấy mã giao dịch");
        return;
      }
      try {
        await axiosInstance.post("/payments/checkout-success", { sessionId });
        clearCart();
        toast.success("Thanh toán thành công!");
        setDone(true);
      } catch (err) {
        setError(err.response?.data?.message || "Xác nhận thanh toán thất bại");
      }
    };
    confirm();
  }, [sessionId, clearCart]);

  if (error) {
    return (
      <main className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
        <p style={{ color: "var(--color-error)" }}>{error}</p>
        <Link
          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-2.5 font-medium text-sm transition-[opacity] duration-150 hover:opacity-90"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-paper)",
          }}
          to="/cart"
        >
          <ShoppingCart className="h-4 w-4" />
          Quay lại giỏ hàng
        </Link>
      </main>
    );
  }

  if (!done) {
    return (
      <main className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
        <div
          className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"
          style={{
            borderColor: "var(--color-accent)",
            borderTopColor: "transparent",
          }}
        />
        <p style={{ color: "var(--color-ink-2)" }}>
          Đang xác nhận thanh toán...
        </p>
      </main>
    );
  }

  return (
    <>
      <Confetti numberOfPieces={400} recycle={false} />
      <main className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ damping: 15, stiffness: 200, type: "spring" }}
        >
          <CheckCircle
            className="mb-4 h-16 w-16"
            style={{ color: "var(--color-success)" }}
          />
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 16 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1
            className="mb-2 font-bold text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Đặt hàng thành công!
          </h1>
          <p className="mb-6 text-sm" style={{ color: "var(--color-ink-2)" }}>
            Cảm ơn bạn đã mua sắm. Đơn hàng của bạn đã được xác nhận.
          </p>
          <Link
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-2.5 font-medium text-sm transition-[opacity] duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-paper)",
            }}
            to="/"
          >
            <ShoppingBag className="h-4 w-4" />
            Tiếp tục mua sắm
          </Link>
        </motion.div>
      </main>
    </>
  );
}
