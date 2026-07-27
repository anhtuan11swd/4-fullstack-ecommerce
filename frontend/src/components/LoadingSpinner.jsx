import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2
          className="h-8 w-8 animate-spin"
          style={{ color: "var(--color-accent)" }}
        />
        <span className="text-sm" style={{ color: "var(--color-ink-2)" }}>
          Đang tải...
        </span>
      </div>
    </div>
  );
}
