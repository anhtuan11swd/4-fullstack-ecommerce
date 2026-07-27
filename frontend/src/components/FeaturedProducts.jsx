import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";

export default function FeaturedProducts({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 768) setItemsPerPage(2);
      else if (window.innerWidth < 1024) setItemsPerPage(3);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerPage);
  const safeIndex = Math.min(currentIndex, maxIndex);

  if (!products.length) return null;

  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + itemsPerPage, maxIndex));
  const prevSlide = () =>
    setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));

  const visibleProducts = products.slice(safeIndex, safeIndex + itemsPerPage);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
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
        <div className="flex gap-1">
          <button
            aria-label="Trước"
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] ${
              safeIndex === 0 ? "opacity-30" : "hover:bg-[var(--color-paper-3)]"
            }`}
            disabled={safeIndex === 0}
            onClick={prevSlide}
            type="button"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Sau"
            className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] ${
              safeIndex >= maxIndex
                ? "opacity-30"
                : "hover:bg-[var(--color-paper-3)]"
            }`}
            disabled={safeIndex >= maxIndex}
            onClick={nextSlide}
            type="button"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product, i) => (
          <ProductCard index={i} key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
