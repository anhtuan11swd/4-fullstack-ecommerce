import { Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { useProductStore } from "../../stores/useProductStore.js";
import AlertDialog from "../AlertDialog.jsx";

export default function ProductList() {
  const { products, loading, deleteProduct, toggleFeaturedProduct } =
    useProductStore();
  const [deleteTarget, setDeleteTarget] = useState(null);

  if (loading) {
    return (
      <p
        className="py-8 text-center text-sm"
        style={{ color: "var(--color-ink-2)" }}
      >
        Đang tải...
      </p>
    );
  }

  if (!products.length) {
    return (
      <p
        className="py-8 text-center text-sm"
        style={{ color: "var(--color-ink-2)" }}
      >
        Chưa có sản phẩm nào
      </p>
    );
  }

  return (
    <>
      <div
        className="overflow-x-auto rounded-xl border"
        style={{ borderColor: "var(--color-border)" }}
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ background: "var(--color-paper-2)" }}>
              <th className="px-4 py-3 font-medium">Ảnh</th>
              <th className="px-4 py-3 font-medium">Tên</th>
              <th className="px-4 py-3 font-medium">Giá</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">
                Danh mục
              </th>
              <th className="px-4 py-3 font-medium">Nổi bật</th>
              <th className="px-4 py-3 font-medium">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                className="border-t transition-colors duration-150 hover:bg-[var(--color-paper-2)]"
                key={product._id}
                style={{ borderColor: "var(--color-border)" }}
              >
                <td className="px-4 py-3">
                  <img
                    alt={product.name}
                    className="h-10 w-10 rounded-lg object-cover"
                    src={product.image}
                  />
                </td>
                <td className="max-w-[160px] truncate px-4 py-3 font-medium">
                  {product.name}
                </td>
                <td
                  className="px-4 py-3"
                  style={{ color: "var(--color-accent)" }}
                >
                  {product.price?.toLocaleString("vi-VN")}₫
                </td>
                <td className="hidden px-4 py-3 capitalize sm:table-cell">
                  {product.category}
                </td>
                <td className="px-4 py-3">
                  <button
                    aria-label={
                      product.isFeatured ? "Bỏ nổi bật" : "Đánh dấu nổi bật"
                    }
                    className="flex cursor-pointer items-center rounded p-1.5 transition-colors duration-150 hover:bg-[var(--color-paper-3)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
                    onClick={() => toggleFeaturedProduct(product._id)}
                    type="button"
                  >
                    <Star
                      className="h-4 w-4"
                      style={{
                        color: product.isFeatured
                          ? "var(--color-accent)"
                          : "var(--color-ink-2)",
                        fill: product.isFeatured
                          ? "var(--color-accent)"
                          : "transparent",
                      }}
                    />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    aria-label="Xóa sản phẩm"
                    className="flex cursor-pointer items-center rounded p-1.5 transition-colors duration-150 hover:bg-[var(--color-paper-3)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
                    onClick={() => setDeleteTarget(product)}
                    style={{ color: "var(--color-error)" }}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog
        cancelLabel="Hủy"
        confirmLabel="Xóa"
        message={`Bạn có chắc muốn xóa "${deleteTarget?.name}"? Hành động này không thể hoàn tác.`}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteProduct(deleteTarget._id)}
        open={!!deleteTarget}
        title="Xóa sản phẩm"
      />
    </>
  );
}
