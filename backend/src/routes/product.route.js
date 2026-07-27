import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute } from "../middleware/adminRoute.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

/**
 * @openapi
 * /api/v1/products/featured:
 *   get:
 *     tags: [Products]
 *     summary: Lấy danh sách sản phẩm nổi bật (có cache Redis)
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm nổi bật
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 *       404:
 *         description: Không có sản phẩm nổi bật
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
router.get("/featured", getFeaturedProducts);

/**
 * @openapi
 * /api/v1/products/category/{category}:
 *   get:
 *     tags: [Products]
 *     summary: Lấy sản phẩm theo danh mục
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         example: shoes
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm theo danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.get("/category/:category", getProductsByCategory);

/**
 * @openapi
 * /api/v1/products/recommendations:
 *   get:
 *     tags: [Products]
 *     summary: Lấy 3 sản phẩm gợi ý ngẫu nhiên
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm gợi ý
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.get("/recommendations", getRecommendedProducts);

/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     tags: [Products]
 *     summary: Lấy tất cả sản phẩm (Admin)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Danh sách tất cả sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
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
 *   post:
 *     tags: [Products]
 *     summary: Tạo sản phẩm mới (Admin)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price, image, category]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nike Air Max
 *               description:
 *                 type: string
 *                 example: Giày thể thao thoải mái
 *               price:
 *                 type: number
 *                 minimum: 15000
 *                 example: 2500000
 *               image:
 *                 type: string
 *                 description: Base64 hoặc URL hình ảnh
 *                 example: data:image/png;base64,iVBOR...
 *               category:
 *                 type: string
 *                 example: shoes
 *     responses:
 *       201:
 *         description: Tạo sản phẩm thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: "#/components/schemas/ValidationError"
 *                 - $ref: "#/components/schemas/Error"
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
router.get("/", protectRoute, adminRoute, getAllProducts);
router.post("/", protectRoute, adminRoute, createProduct);

/**
 * @openapi
 * /api/v1/products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Xóa sản phẩm (Admin)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Đã xóa sản phẩm thành công
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
 *       403:
 *         description: Không có quyền admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       404:
 *         description: Không tìm thấy sản phẩm
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
 *   patch:
 *     tags: [Products]
 *     summary: Chuyển đổi trạng thái nổi bật của sản phẩm (Admin)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
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
 *       404:
 *         description: Không tìm thấy sản phẩm
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
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);

export default router;
