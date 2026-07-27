import { ImagePlus, Package, Trash2 } from "lucide-react";
import { useState } from "react";
import { createProductSchema } from "../../lib/validators.js";
import { useProductStore } from "../../stores/useProductStore.js";

export default function CreateProductForm() {
  const { createProduct, loading } = useProductStore();
  const [form, setForm] = useState({
    category: "jeans",
    description: "",
    image: "",
    name: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (field, value) => {
    const result = createProductSchema.safeParse({ ...form, [field]: value });
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const value = reader.result;
      setForm((prev) => ({ ...prev, image: value }));
      if (touched.image) validateField("image", value);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = createProductSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setTouched({ description: true, image: true, name: true, price: true });
      return;
    }
    await createProduct(form);
    setForm({
      category: "jeans",
      description: "",
      image: "",
      name: "",
      price: "",
    });
    setErrors({});
    setTouched({});
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-[border-color,opacity] duration-150 focus-visible:border-[var(--color-accent)] ${
      touched[field] && errors[field] ? "border-[var(--color-error)]" : ""
    } ${loading ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`;

  return (
    <div
      className="mx-auto max-w-lg rounded-xl border p-6"
      style={{
        background: "var(--color-paper)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mb-6 flex items-center gap-2">
        <Package className="h-5 w-5" style={{ color: "var(--color-accent)" }} />
        <h2
          className="font-semibold text-lg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Thêm sản phẩm
        </h2>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <input
            className={inputClass("name")}
            disabled={loading}
            onBlur={() => handleBlur("name")}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Tên sản phẩm"
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
          {touched.name && errors.name && (
            <p className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <textarea
            className={`${inputClass("description")} resize-none`}
            disabled={loading}
            onBlur={() => handleBlur("description")}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Mô tả"
            rows={3}
            style={{
              background: "var(--color-paper)",
              borderColor:
                touched.description && errors.description
                  ? "var(--color-error)"
                  : "var(--color-border)",
            }}
            value={form.description}
          />
          {touched.description && errors.description && (
            <p className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
              {errors.description}
            </p>
          )}
        </div>

        <div>
          <input
            className={inputClass("price")}
            disabled={loading}
            onBlur={() => handleBlur("price")}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="Giá (₫)"
            style={{
              background: "var(--color-paper)",
              borderColor:
                touched.price && errors.price
                  ? "var(--color-error)"
                  : "var(--color-border)",
            }}
            type="number"
            value={form.price}
          />
          {touched.price && errors.price && (
            <p className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
              {errors.price}
            </p>
          )}
        </div>

        <div>
          <select
            className={inputClass("category")}
            disabled={loading}
            onBlur={() => handleBlur("category")}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={{
              background: "var(--color-paper)",
              borderColor:
                touched.category && errors.category
                  ? "var(--color-error)"
                  : "var(--color-border)",
            }}
            value={form.category}
          >
            <option value="jeans">Quần Jean</option>
            <option value="shirts">Áo Sơ Mi</option>
            <option value="shoes">Giày Dép</option>
            <option value="glasses">Kính Mắt</option>
            <option value="jackets">Áo Khoác</option>
            <option value="suits">Comple</option>
          </select>
          {touched.category && errors.category && (
            <p className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
              {errors.category}
            </p>
          )}
        </div>

        <div>
          {form.image ? (
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                background: "var(--color-paper-2)",
                border: "1px solid var(--color-border)",
              }}
            >
              <img
                alt="Preview"
                className="w-full"
                src={form.image}
                style={{ display: "block" }}
              />
              <button
                aria-label="Xóa ảnh"
                className={`absolute top-2 right-2 flex items-center rounded-lg p-2 text-white transition-[opacity] duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] ${
                  loading
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : "cursor-pointer bg-black/50 hover:bg-black/70"
                }`}
                disabled={loading}
                onClick={() => {
                  setForm((prev) => ({ ...prev, image: "" }));
                  setTouched((prev) => ({ ...prev, image: true }));
                }}
                type="button"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              className={`flex items-center justify-center gap-2 rounded-lg border border-dashed p-4 transition-[opacity] duration-150 ${
                touched.image && errors.image
                  ? "border-[var(--color-error)]"
                  : ""
              } ${
                loading
                  ? "pointer-events-none cursor-not-allowed opacity-50"
                  : "cursor-pointer transition-colors duration-150 hover:bg-[var(--color-paper-3)]"
              }`}
              style={{
                borderColor:
                  touched.image && errors.image
                    ? "var(--color-error)"
                    : "var(--color-border)",
              }}
            >
              <label
                className={`flex items-center gap-2 text-sm ${loading ? "pointer-events-none" : "cursor-pointer"}`}
                style={{ color: "var(--color-ink-2)" }}
              >
                <ImagePlus className="h-5 w-5" />
                Chọn ảnh sản phẩm
                <input
                  accept="image/*"
                  className="hidden"
                  disabled={loading}
                  onChange={handleImageChange}
                  type="file"
                />
              </label>
            </div>
          )}
          {touched.image && errors.image && (
            <p className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
              {errors.image}
            </p>
          )}
        </div>

        <button
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 font-medium text-sm transition-[opacity] duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] ${loading ? "pointer-events-none cursor-not-allowed opacity-50" : "hover:opacity-90"}`}
          disabled={loading}
          style={{
            background: "var(--color-accent)",
            color: "var(--color-paper)",
          }}
          type="submit"
        >
          <Package className="h-4 w-4" />
          {loading ? "Đang tạo..." : "Tạo sản phẩm"}
        </button>
      </form>
    </div>
  );
}
