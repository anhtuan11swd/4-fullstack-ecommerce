import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
  console.log(`Tài liệu API tại http://localhost:${PORT}/api-docs`);
});
