import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore.js";
import ProductCard from "./ProductCard.jsx";

export default function PeopleAlsoBought() {
  const { recommendations, fetchRecommendations } = useProductStore();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  if (!recommendations.length) return null;

  return (
    <section>
      <h2
        className="mb-4 font-semibold text-lg"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Có thể bạn cũng thích
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {recommendations.map((product, i) => (
          <ProductCard index={i} key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
