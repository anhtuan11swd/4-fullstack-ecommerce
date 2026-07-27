import { z } from "zod";

export const validateCouponSchema = z.object({
  code: z
    .string({ message: "Mã giảm giá là bắt buộc" })
    .trim()
    .min(1, "Mã giảm giá không được để trống"),
});
