import { motion } from "framer-motion";
import { Package, Shield, ShoppingBag } from "lucide-react";

const features = [
  {
    desc: "Mỗi sản phẩm đều được chọn lọc thủ công về chất lượng và tay nghề.",
    icon: ShoppingBag,
    title: "Bộ sưu tập chọn lọc",
  },
  {
    desc: "Miễn phí vận chuyển cho đơn hàng trên $50. Giao hàng trong 2–5 ngày làm việc.",
    icon: Package,
    title: "Giao hàng nhanh",
  },
  {
    desc: "Được bảo vệ bởi Stripe. Dữ liệu của bạn không bao giờ chạm đến máy chủ của chúng tôi.",
    icon: Shield,
    title: "Thanh toán an toàn",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-20 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          className="mb-4 font-bold text-4xl leading-tight sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Mọi thứ bạn cần, được giao hàng cẩn thận.
        </h1>
        <p
          className="mx-auto mb-8 max-w-md text-lg"
          style={{ color: "var(--color-ink-2)" }}
        >
          Khám phá những sản phẩm bền bỉ, từ những thương hiệu chia sẻ giá trị
          của bạn.
        </p>
        <a
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 font-medium text-sm transition-[transform,opacity] duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] active:translate-y-px"
          href="/signup"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-paper)",
          }}
        >
          <ShoppingBag className="h-4 w-4" />
          Bắt đầu mua sắm
        </a>
      </motion.section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feat, i) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border p-6 transition-shadow duration-250 hover:shadow-sm"
            initial={{ opacity: 0, y: 16 }}
            key={feat.title}
            style={{
              background: "var(--color-paper)",
              borderColor: "var(--color-border)",
            }}
            transition={{
              delay: 0.1 * i,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-paper)",
              }}
            >
              <feat.icon className="h-5 w-5" />
            </div>
            <h3
              className="mb-1 font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {feat.title}
            </h3>
            <p className="text-sm" style={{ color: "var(--color-ink-2)" }}>
              {feat.desc}
            </p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
