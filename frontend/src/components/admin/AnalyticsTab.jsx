import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { axiosInstance } from "../../lib/axios.js";

export default function AnalyticsTab() {
  const [analytics, setAnalytics] = useState(null);
  const [dailySales, setDailySales] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get("/analytics");
        setAnalytics(res.data.analyticsData);
        setDailySales(res.data.dailySalesData);
      } catch {
        // silent
      }
    };
    fetch();
  }, []);

  const cards = [
    {
      icon: Users,
      label: "Người dùng",
      value: analytics?.users ?? "—",
    },
    {
      icon: Package,
      label: "Sản phẩm",
      value: analytics?.products ?? "—",
    },
    {
      icon: ShoppingCart,
      label: "Đơn hàng",
      value: analytics?.totalSales ?? "—",
    },
    {
      icon: DollarSign,
      label: "Doanh thu",
      value: analytics?.totalRevenue
        ? `${(analytics.totalRevenue / 1000).toFixed(1)}K₫`
        : "—",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            className="rounded-xl border p-4"
            key={card.label}
            style={{
              background: "var(--color-paper)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <card.icon
                className="h-4 w-4"
                style={{ color: "var(--color-accent)" }}
              />
              <span className="text-xs" style={{ color: "var(--color-ink-2)" }}>
                {card.label}
              </span>
            </div>
            <span
              className="font-bold text-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {card.value}
            </span>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl border p-4"
        style={{
          background: "var(--color-paper)",
          borderColor: "var(--color-border)",
        }}
      >
        <h3
          className="mb-4 font-semibold text-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Doanh thu & Đơn hàng 7 ngày qua
        </h3>
        <ResponsiveContainer height={300} width="100%">
          <LineChart data={dailySales.length ? dailySales : []}>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              stroke="var(--color-ink-2)"
              tick={{ fontSize: 12 }}
              tickFormatter={(v) => {
                const d = new Date(v);
                return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
              }}
            />
            <YAxis stroke="var(--color-ink-2)" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "var(--color-paper)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Line
              dataKey="revenue"
              dot={false}
              name="Doanh thu"
              stroke="var(--color-accent)"
              strokeWidth={2}
              type="monotone"
            />
            <Line
              dataKey="sales"
              dot={false}
              name="Đơn hàng"
              stroke="var(--color-success)"
              strokeWidth={2}
              type="monotone"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
