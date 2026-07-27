import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z
    .string({ message: "ID sản phẩm là bắt buộc" })
    .min(1, "ID sản phẩm không được để trống"),
});

export const updateQuantitySchema = z.object({
  quantity: z
    .number({ message: "Số lượng là bắt buộc" })
    .int("Số lượng phải là số nguyên")
    .min(0, "Số lượng không được âm"),
});

export const removeFromCartSchema = z.object({
  productId: z.string().optional(),
});
