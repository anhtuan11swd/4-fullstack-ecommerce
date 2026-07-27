import { Check, Gift, Percent, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore.js";

export default function GiftCouponCard() {
  const { coupon, isCouponApplied, getMyCoupon, applyCoupon, removeCoupon } =
    useCartStore();
  const [code, setCode] = useState("");

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  const handleApply = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    applyCoupon(code.trim().toUpperCase());
  };

  return (
    <div
      className="rounded-xl border p-4"
      style={{
        background: "var(--color-paper-2)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mb-3 flex items-center gap-2 font-semibold text-sm">
        <Gift className="h-4 w-4" style={{ color: "var(--color-accent)" }} />
        Mã giảm giá
      </div>

      {isCouponApplied && coupon ? (
        <div
          className="flex items-center justify-between rounded-lg border px-3 py-2"
          style={{
            background: "var(--color-paper)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex items-center gap-2">
            <Percent
              className="h-4 w-4"
              style={{ color: "var(--color-success)" }}
            />
            <div>
              <span className="font-semibold text-sm">{coupon.code}</span>
              <span
                className="ml-2 text-xs"
                style={{ color: "var(--color-ink-2)" }}
              >
                Giảm {coupon.discountPercentage}%
              </span>
            </div>
          </div>
          <button
            aria-label="Hủy mã giảm giá"
            className="flex cursor-pointer items-center rounded p-1 transition-colors duration-150 hover:bg-[var(--color-paper-3)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
            onClick={removeCoupon}
            style={{ color: "var(--color-error)" }}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <form className="flex gap-2" onSubmit={handleApply}>
          <input
            className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm outline-none transition-[border-color] duration-150 focus-visible:border-[var(--color-accent)]"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Nhập mã..."
            style={{
              background: "var(--color-paper)",
              borderColor: "var(--color-border)",
            }}
            type="text"
            value={code}
          />
          <button
            className="flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 font-medium text-sm transition-[opacity] duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-paper)",
            }}
            type="submit"
          >
            <Check className="h-4 w-4" />
            Áp dụng
          </button>
        </form>
      )}
    </div>
  );
}
