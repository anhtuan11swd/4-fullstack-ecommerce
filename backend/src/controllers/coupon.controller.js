import Coupon from "../models/coupon.model.js";
import { validateCouponSchema } from "../validators/coupon.validator.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      isActive: true,
      userId: req.user._id,
    });
    res.json(coupon);
  } catch (error) {
    console.error("Lỗi lấy coupon:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const parsed = validateCouponSchema.safeParse(req.body);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ errors, message: "Dữ liệu không hợp lệ" });
    }

    const { code } = parsed.data;
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: "Không tìm thấy mã giảm giá" });
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(400).json({ message: "Mã giảm giá đã hết hạn" });
    }

    res.json({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    console.error("Lỗi xác thực coupon:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
