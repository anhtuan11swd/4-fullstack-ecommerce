import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-paper)",
          }}
        >
          <Shield className="h-7 w-7" />
        </div>
        <h1
          className="mb-2 font-bold text-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Bảng điều khiển quản trị
        </h1>
        <p className="mb-8" style={{ color: "var(--color-ink-2)" }}>
          Quản lý sản phẩm, đơn hàng và phân tích.
        </p>

        <div
          className="mx-auto max-w-md rounded-xl border p-8"
          style={{
            background: "var(--color-paper-2)",
            borderColor: "var(--color-border)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--color-ink-2)" }}>
            Nội dung bảng điều khiển sẽ có sẵn trong giai đoạn tiếp theo.
          </p>
        </div>
      </motion.div>
    </main>
  );
}
