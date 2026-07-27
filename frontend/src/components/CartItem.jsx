import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore.js";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart, loading } = useCartStore();
  const displayPrice = item.price?.toLocaleString("vi-VN");
  const displaySubtotal = (item.price * item.quantity)?.toLocaleString("vi-VN");

  return (
    <div
      className="flex gap-4 rounded-xl border p-4"
      style={{
        background: "var(--color-paper)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          alt={item.name}
          className="h-full w-full object-cover"
          src={item.image}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h4
              className="font-semibold text-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {item.name}
            </h4>
            <p
              className="mt-0.5 text-xs"
              style={{ color: "var(--color-ink-2)" }}
            >
              {displayPrice}₫ x1
            </p>
          </div>
          <button
            aria-label="Xóa sản phẩm"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors duration-150 hover:bg-[var(--color-paper-3)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
            disabled={loading}
            onClick={() => removeFromCart(item._id)}
            style={{ color: "var(--color-error)" }}
            type="button"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-1 rounded-lg border"
            style={{ borderColor: "var(--color-border)" }}
          >
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-l-lg transition-colors duration-150 hover:bg-[var(--color-paper-3)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] disabled:cursor-not-allowed disabled:opacity-40"
              disabled={loading || item.quantity <= 1}
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              type="button"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="flex h-8 min-w-[2rem] items-center justify-center font-medium text-sm">
              {item.quantity}
            </span>
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r-lg transition-colors duration-150 hover:bg-[var(--color-paper-3)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] disabled:opacity-40"
              disabled={loading}
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              type="button"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span
            className="font-semibold text-sm"
            style={{ color: "var(--color-accent)" }}
          >
            {displaySubtotal}₫
          </span>
        </div>
      </div>
    </div>
  );
}
