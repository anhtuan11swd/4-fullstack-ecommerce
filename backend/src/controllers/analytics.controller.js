import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const getDailySalesData = async (startDate, endDate) => {
  const dailySales = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: { $dateToString: { date: "$createdAt", format: "%Y-%m-%d" } },
        revenue: { $sum: "$totalAmount" },
        sales: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const dates = getDatesInRange(startDate, endDate);

  return dates.map((date) => {
    const found = dailySales.find((item) => item._id === date);
    return {
      date,
      revenue: found?.revenue || 0,
      sales: found?.sales || 0,
    };
  });
};

export const getAnalyticsData = async (_req, res) => {
  try {
    const [totalUsers, totalProducts, salesData, revenueData] =
      await Promise.all([
        User.countDocuments(),
        Product.countDocuments(),
        Order.aggregate([{ $group: { _id: null, totalSales: { $sum: 1 } } }]),
        Order.aggregate([
          { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
        ]),
      ]);

    const totalSales = salesData[0]?.totalSales || 0;
    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);

    const dailySalesData = await getDailySalesData(startDate, endDate);

    res.json({
      analyticsData: {
        products: totalProducts,
        totalRevenue,
        totalSales,
        users: totalUsers,
      },
      dailySalesData,
    });
  } catch (error) {
    console.error("Lỗi lấy dữ liệu phân tích:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
