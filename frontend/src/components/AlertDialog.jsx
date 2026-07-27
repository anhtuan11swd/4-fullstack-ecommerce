import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Xóa",
  cancelLabel = "Hủy",
}) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (open) confirmRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-sm rounded-xl border p-6 shadow-lg"
            exit={{ opacity: 0, scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.95 }}
            style={{
              background: "var(--color-paper)",
              borderColor: "var(--color-border)",
            }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              aria-label="Đóng"
              className="absolute top-3 right-3 flex cursor-pointer items-center rounded-lg p-1.5 transition-colors duration-150 hover:bg-[var(--color-paper-3)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
              onClick={onClose}
              style={{ color: "var(--color-ink-2)" }}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  background: "var(--color-error)",
                  color: "var(--color-paper)",
                }}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3
                  className="font-semibold text-base"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {title}
                </h3>
                {message && (
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-ink-2)" }}
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 font-medium text-sm transition-colors duration-150 hover:bg-[var(--color-paper-3)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
                onClick={onClose}
                style={{ color: "var(--color-ink-2)" }}
                type="button"
              >
                <X className="h-4 w-4" />
                {cancelLabel}
              </button>
              <button
                className="flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 font-medium text-sm transition-[opacity] duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                ref={confirmRef}
                style={{
                  background: "var(--color-error)",
                  color: "var(--color-paper)",
                }}
                type="button"
              >
                <Trash2 className="h-4 w-4" />
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
