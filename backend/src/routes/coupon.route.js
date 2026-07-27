import { Router } from "express";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

/**
 * @openapi
 * /api/v1/coupons:
 *   get:
 *     tags: [Coupons]
 *     summary: Lấy mã giảm giá đang hoạt động của người dùng
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Thông tin mã giảm giá (hoặc null nếu không có)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Coupon"
 *       401:
 *         description: Chưa đăng nhập
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
router.get("/", protectRoute, getCoupon);

/**
 * @openapi
 * /api/v1/coupons/validate:
 *   post:
 *     tags: [Coupons]
 *     summary: Xác thực mã giảm giá
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code]
 *             properties:
 *               code:
 *                 type: string
 *                 example: SAVE10
 *     responses:
 *       200:
 *         description: Mã giảm giá hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: SAVE10
 *                 discountPercentage:
 *                   type: number
 *                   example: 10
 *       400:
 *         description: Mã giảm giá đã hết hạn
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       404:
 *         description: Không tìm thấy mã giảm giá
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
router.post("/validate", protectRoute, validateCoupon);

export default router;
