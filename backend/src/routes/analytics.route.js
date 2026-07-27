import { Router } from "express";
import { getAnalyticsData } from "../controllers/analytics.controller.js";
import { adminRoute } from "../middleware/adminRoute.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

/**
 * @openapi
 * /api/v1/analytics:
 *   get:
 *     tags: [Analytics]
 *     summary: Lấy dữ liệu phân tích tổng quan và doanh số 7 ngày (Admin)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Dữ liệu phân tích
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 analyticsData:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: number
 *                       example: 248
 *                     products:
 *                       type: number
 *                       example: 53
 *                     totalSales:
 *                       type: number
 *                       example: 186
 *                     totalRevenue:
 *                       type: number
 *                       example: 29435000
 *                 dailySalesData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         example: "2026-07-21"
 *                       sales:
 *                         type: number
 *                         example: 3
 *                       revenue:
 *                         type: number
 *                         example: 420000
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       403:
 *         description: Không có quyền admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.get("/", protectRoute, adminRoute, getAnalyticsData);

export default router;
