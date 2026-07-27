import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const images = {
  glasses:
    "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80",
  jackets:
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
  jeans: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
  shirts:
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
  shoes:
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
  suits:
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&q=80",
};

const labels = {
  glasses: "Kính Mắt",
  jackets: "Áo Khoác",
  jeans: "Quần Jean",
  shirts: "Áo Sơ Mi",
  shoes: "Giày Dép",
  suits: "Comple",
};

export default function CategoryItem({ category }) {
  return (
    <Link
      className="group relative block cursor-pointer overflow-hidden rounded-xl transition-shadow duration-250 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
      style={{ background: "var(--color-paper-2)" }}
      to={`/category/${category}`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          alt={labels[category] || category}
          className="h-full w-full object-cover transition-[transform,opacity] duration-500 group-hover:scale-105"
          loading="lazy"
          src={images[category] || images.jeans}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between p-4">
        <h3
          className="font-semibold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {labels[category] || category}
        </h3>
        <span className="flex items-center gap-1 text-sm text-white/80 transition-[gap] duration-250 group-hover:gap-2">
          Khám phá <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
