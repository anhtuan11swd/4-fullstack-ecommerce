import { z } from "zod";

export const createProductSchema = z.object({
  category: z
    .string({ message: "Danh mục là bắt buộc" })
    .trim()
    .min(1, "Danh mục không được để trống"),
  description: z
    .string({ message: "Mô tả sản phẩm là bắt buộc" })
    .trim()
    .min(1, "Mô tả không được để trống"),
  image: z
    .string({ message: "Hình ảnh là bắt buộc" })
    .min(1, "Hình ảnh không được để trống"),
  name: z
    .string({ message: "Tên sản phẩm là bắt buộc" })
    .trim()
    .min(1, "Tên sản phẩm không được để trống"),
  price: z
    .number({ message: "Giá sản phẩm là bắt buộc" })
    .min(15000, "Giá sản phẩm tối thiểu là 15,000"),
});
