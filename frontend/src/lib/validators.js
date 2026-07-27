import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email là bắt buộc" })
    .trim()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ"),
  password: z
    .string({ message: "Mật khẩu là bắt buộc" })
    .trim()
    .min(1, "Vui lòng nhập mật khẩu"),
});

export const signupSchema = z.object({
  email: z
    .string({ message: "Email là bắt buộc" })
    .trim()
    .min(1, "Email là bắt buộc")
    .email("Email không hợp lệ"),
  name: z
    .string({ message: "Tên là bắt buộc" })
    .trim()
    .min(1, "Tên là bắt buộc")
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(100, "Tên không được vượt quá 100 ký tự")
    .regex(
      /^[\p{L}\s'.-]+$/u,
      "Tên chỉ được chứa chữ cái, khoảng trắng, dấu gạch ngang (-) và dấu nháy (')",
    ),
  password: z
    .string({ message: "Mật khẩu là bắt buộc" })
    .trim()
    .min(1, "Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(64, "Mật khẩu không được vượt quá 64 ký tự")
    .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường")
    .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa")
    .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 số")
    .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt")
    .regex(/^\S*$/, "Mật khẩu không được chứa khoảng trắng"),
});
