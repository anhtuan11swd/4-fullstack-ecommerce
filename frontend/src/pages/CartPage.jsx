import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import GiftCouponCard from "../components/GiftCouponCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import PeopleAlsoBought from "../components/PeopleAlsoBought.jsx";
import { useCartStore } from "../stores/useCartStore.js";

export default function CartPage() {
  const { cart, loading, getCartItems } = useCartStore();

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  if (loading) return <LoadingSpinner />;

  if (!cart.length) {
    return (
      <main className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
        <ShoppingCart
          className="mb-4 h-16 w-16"
          style={{ color: "var(--color-ink-2)" }}
        />
        <h1
          className="mb-2 font-semibold text-xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Giỏ hàng trống
        </h1>
        <p className="mb-6 text-sm" style={{ color: "var(--color-ink-2)" }}>
          Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
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
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1
        className="mb-6 font-bold text-2xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Giỏ hàng
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem item={item} key={item._id} />
          ))}
          <GiftCouponCard />
          <PeopleAlsoBought />
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary />
        </div>
      </div>
    </main>
  );
}
