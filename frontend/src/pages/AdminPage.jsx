import { motion } from "framer-motion";
import { BarChart3, Package, Plus, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import AnalyticsTab from "../components/admin/AnalyticsTab.jsx";
import CreateProductForm from "../components/admin/CreateProductForm.jsx";
import ProductList from "../components/admin/ProductList.jsx";
import { useProductStore } from "../stores/useProductStore.js";

const tabs = [
  { icon: Plus, id: "create", label: "Tạo sản phẩm" },
  { icon: Package, id: "products", label: "Sản phẩm" },
  { icon: BarChart3, id: "analytics", label: "Phân tích" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-paper)",
            }}
          >
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1
              className="font-bold text-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Bảng điều khiển quản trị
            </h1>
            <p className="text-sm" style={{ color: "var(--color-ink-2)" }}>
              Quản lý sản phẩm, đơn hàng và phân tích
            </p>
          </div>
        </div>

        <div
          className="mb-6 flex gap-1 rounded-xl border p-1"
          style={{
            background: "var(--color-paper-2)",
            borderColor: "var(--color-border)",
          }}
        >
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-medium text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] ${
                  active ? "" : "hover:bg-[var(--color-paper-3)]"
                }`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={
                  active
                    ? {
                        background: "var(--color-accent)",
                        color: "var(--color-paper)",
                      }
                    : { color: "var(--color-ink-2)" }
                }
                type="button"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 8 }}
          key={activeTab}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "create" && <CreateProductForm />}
          {activeTab === "products" && <ProductList />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </motion.div>
      </motion.div>
    </main>
  );
}
