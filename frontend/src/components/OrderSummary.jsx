import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useCartStore } from "../stores/useCartStore.js";
import { useUserStore } from "../stores/useUserStore.js";

export default function OrderSummary() {
  const { user } = useUserStore();
  const { cart, coupon, subtotal, total, loading } = useCartStore();
  const displaySubtotal = subtotal.toLocaleString("vi-VN");
  const displayTotal = total.toLocaleString("vi-VN");
  const savings = subtotal - total;
  const displaySavings = savings.toLocaleString("vi-VN");

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thanh toán");
      return;
    }
    try {
      const res = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          couponCode: coupon?.code || undefined,
          products: cart.map((item) => ({
            _id: item._id,
            image: item.image,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      );
      const { data } = res;
      window.location.href = data.url;
    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      toast.error(
        error.response?.data?.message || "Không thể tạo phiên thanh toán",
      );
    }
  };

  return (
    <div
      className="rounded-xl border p-4"
      style={{
        background: "var(--color-paper-2)",
        borderColor: "var(--color-border)",
      }}
    >
      <h3
        className="mb-4 font-semibold text-sm"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Tóm tắt đơn hàng
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span style={{ color: "var(--color-ink-2)" }}>Tạm tính</span>
          <span>{displaySubtotal}₫</span>
        </div>

        {savings > 0 && (
          <div
            className="flex justify-between"
            style={{ color: "var(--color-success)" }}
          >
            <span>Giảm giá</span>
            <span>-{displaySavings}₫</span>
          </div>
        )}

        {coupon && (
          <div
            className="flex justify-between text-xs"
            style={{ color: "var(--color-ink-2)" }}
          >
            <span>Mã: {coupon.code}</span>
            <span>-{coupon.discountPercentage}%</span>
          </div>
        )}
      </div>

      <hr className="my-3" style={{ borderColor: "var(--color-border)" }} />

      <div className="mb-4 flex justify-between font-semibold text-sm">
        <span>Tổng cộng</span>
        <span style={{ color: "var(--color-accent)" }}>{displayTotal}₫</span>
      </div>

      <button
        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 font-medium text-sm transition-[transform,opacity] duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] active:translate-y-px ${loading || !cart.length ? "pointer-events-none cursor-not-allowed opacity-50" : "hover:opacity-90"}`}
        disabled={loading || !cart.length}
        onClick={handleCheckout}
        style={{
          background: "var(--color-accent)",
          color: "var(--color-paper)",
        }}
        type="button"
      >
        <Lock className="h-4 w-4" />
        Thanh toán
      </button>
    </div>
  );
}
