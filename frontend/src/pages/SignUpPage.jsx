import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../lib/validators.js";
import { useUserStore } from "../stores/useUserStore.js";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup, loading } = useUserStore();
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (field, value) => {
    const result = signupSchema.safeParse({ ...form, [field]: value });
    if (!result.success) {
      const fieldError = result.error.issues.find((i) => i.path[0] === field);
      setErrors((prev) => ({ ...prev, [field]: fieldError?.message || "" }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = signupSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setTouched({ email: true, name: true, password: true });
      return;
    }
    try {
      await signup(form);
      navigate("/login");
    } catch {
      // error handled by the store
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border py-2.5 text-sm outline-none transition-[border-color,opacity] duration-150 focus-visible:border-[var(--color-accent)] ${loading ? "pointer-events-none cursor-not-allowed opacity-50" : ""} ${touched[field] && errors[field] ? "border-[var(--color-error)]" : ""}`;

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-sm flex-col justify-center px-4">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-paper)",
            }}
          >
            <UserPlus className="h-6 w-6" />
          </div>
          <h1
            className="mb-1 font-bold text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Tạo tài khoản của bạn
          </h1>
          <p className="text-sm" style={{ color: "var(--color-ink-2)" }}>
            Bắt đầu mua sắm trong vài phút
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-1.5 block font-medium text-sm"
              htmlFor="name"
              style={{ color: "var(--color-ink-2)" }}
            >
              Họ và tên
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                style={{
                  color:
                    touched.name && errors.name
                      ? "var(--color-error)"
                      : "var(--color-ink-2)",
                }}
              />
              <input
                className={`${inputClass("name")} pr-3 pl-10`}
                disabled={loading}
                id="name"
                onBlur={() => handleBlur("name")}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nguyễn Văn A"
                style={{
                  background: "var(--color-paper)",
                  borderColor:
                    touched.name && errors.name
                      ? "var(--color-error)"
                      : "var(--color-border)",
                }}
                type="text"
                value={form.name}
              />
            </div>
            {touched.name && errors.name && (
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-error)" }}
              >
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-1.5 block font-medium text-sm"
              htmlFor="email"
              style={{ color: "var(--color-ink-2)" }}
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                style={{
                  color:
                    touched.email && errors.email
                      ? "var(--color-error)"
                      : "var(--color-ink-2)",
                }}
              />
              <input
                className={`${inputClass("email")} pr-3 pl-10`}
                disabled={loading}
                id="email"
                onBlur={() => handleBlur("email")}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                style={{
                  background: "var(--color-paper)",
                  borderColor:
                    touched.email && errors.email
                      ? "var(--color-error)"
                      : "var(--color-border)",
                }}
                type="email"
                value={form.email}
              />
            </div>
            {touched.email && errors.email && (
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-error)" }}
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              className="mb-1.5 block font-medium text-sm"
              htmlFor="password"
              style={{ color: "var(--color-ink-2)" }}
            >
              Mật khẩu
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                style={{
                  color:
                    touched.password && errors.password
                      ? "var(--color-error)"
                      : "var(--color-ink-2)",
                }}
              />
              <input
                className={`${inputClass("password")} pr-10 pl-10`}
                disabled={loading}
                id="password"
                minLength={6}
                onBlur={() => handleBlur("password")}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                style={{
                  background: "var(--color-paper)",
                  borderColor:
                    touched.password && errors.password
                      ? "var(--color-error)"
                      : "var(--color-border)",
                }}
                type={showPassword ? "text" : "password"}
                value={form.password}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={`absolute top-1/2 right-3 flex -translate-y-1/2 items-center rounded p-1 transition-[opacity] duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] ${loading ? "pointer-events-none cursor-not-allowed opacity-50" : "cursor-pointer transition-colors duration-150 hover:bg-[var(--color-paper-3)]"}`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  color:
                    touched.password && errors.password
                      ? "var(--color-error)"
                      : "var(--color-ink-2)",
                }}
                tabIndex={-1}
                type="button"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-error)" }}
              >
                {errors.password}
              </p>
            )}
          </div>

          <button
            className={`mt-2 flex items-center justify-center gap-2 rounded-lg py-2.5 font-medium text-sm transition-[transform,opacity] duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] active:translate-y-px ${loading ? "pointer-events-none cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            disabled={loading}
            style={{
              background: "var(--color-accent)",
              color: "var(--color-paper)",
            }}
            type="submit"
          >
            <UserPlus className="h-4 w-4" />
            {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </button>
        </form>

        <p
          className="mt-6 text-center text-sm"
          style={{ color: "var(--color-ink-2)" }}
        >
          Đã có tài khoản?{" "}
          <Link
            className={`font-medium underline-offset-2 ${loading ? "pointer-events-none opacity-50" : "cursor-pointer hover:underline"}`}
            style={{ color: "var(--color-accent)" }}
            to="/login"
          >
            Đăng nhập
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
