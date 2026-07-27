import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryItem from "../components/CategoryItem.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useProductStore } from "../stores/useProductStore.js";

const categoryList = [
  "jeans",
  "shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
];

export default function HomePage() {
  const { featured, loading, fetchFeaturedProducts } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mb-16 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          className="mb-3 font-bold text-4xl leading-tight sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Thời trang cao cấp, cho mọi phong cách
        </h1>
        <p
          className="mx-auto mb-8 max-w-md text-lg"
          style={{ color: "var(--color-ink-2)" }}
        >
          Khám phá bộ sưu tập mới nhất từ những thương hiệu hàng đầu
        </p>
        <Link
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 font-medium text-sm transition-[transform,opacity] duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] active:translate-y-px"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-paper)",
          }}
          to="/category/jeans"
        >
          <ShoppingBag className="h-4 w-4" />
          Mua sắm ngay
        </Link>
      </motion.section>

      <section className="mb-16">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles
            className="h-5 w-5"
            style={{ color: "var(--color-accent)" }}
          />
          <h2
            className="font-semibold text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Danh mục
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryList.map((cat) => (
            <CategoryItem category={cat} key={cat} />
          ))}
        </div>
      </section>

      {loading ? (
        <LoadingSpinner />
      ) : featured.length > 0 ? (
        <section>
          <div className="mb-6 flex items-center gap-2">
            <Sparkles
              className="h-5 w-5"
              style={{ color: "var(--color-accent)" }}
            />
            <h2
              className="font-semibold text-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sản phẩm nổi bật
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product, i) => (
              <ProductCard index={i} key={product._id} product={product} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
