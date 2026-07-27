import { ArrowLeft, PackageOpen } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useProductStore } from "../stores/useProductStore.js";

const categoryLabels = {
  glasses: "Kính Mắt",
  jackets: "Áo Khoác",
  jeans: "Quần Jean",
  shirts: "Áo Sơ Mi",
  shoes: "Giày Dép",
  suits: "Comple",
};

export default function CategoryPage() {
  const { category } = useParams();
  const { products, loading, fetchProductsByCategory } = useProductStore();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [category, fetchProductsByCategory]);

  const label = categoryLabels[category] || category;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          className="mb-4 inline-flex cursor-pointer items-center gap-1.5 font-medium text-sm transition-colors duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
          style={{ color: "var(--color-ink-2)" }}
          to="/"
        >
          <ArrowLeft className="h-4 w-4" />
          Trang chủ
        </Link>
        <h1
          className="mt-2 font-bold text-2xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {label}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-ink-2)" }}>
          {loading ? "Đang tải..." : `${products.length} sản phẩm`}
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <PackageOpen
            className="mb-4 h-12 w-12"
            style={{ color: "var(--color-ink-2)" }}
          />
          <p style={{ color: "var(--color-ink-2)" }}>
            Chưa có sản phẩm nào trong danh mục này
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard index={i} key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
