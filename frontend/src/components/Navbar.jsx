import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  ShoppingCart,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore.js";

export default function Navbar() {
  const { user, logout } = useUserStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass =
    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer hover:bg-[var(--color-paper-3)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]";
  const mobileNavLinkClass =
    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-150 cursor-pointer hover:bg-[var(--color-paper-3)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]";

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "var(--color-paper)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          className="flex cursor-pointer items-center gap-2 font-semibold text-lg transition-opacity duration-150 hover:opacity-80"
          style={{ fontFamily: "var(--font-display)" }}
          to="/"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-sm"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-paper)",
            }}
          >
            S
          </span>
          Cửa hàng
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link className={navLinkClass} to="/cart">
            <ShoppingCart className="h-4 w-4" />
            <span>Giỏ hàng</span>
          </Link>

          {user?.role === "admin" && (
            <Link className={navLinkClass} to="/secret-dashboard">
              <LayoutDashboard className="h-4 w-4" />
              <span>Bảng điều khiển</span>
            </Link>
          )}

          {user ? (
            <button
              className={navLinkClass}
              onClick={logout}
              style={{ color: "var(--color-error)" }}
              type="button"
            >
              <LogOut className="h-4 w-4" />
              <span>Đăng xuất</span>
            </button>
          ) : (
            <>
              <Link className={navLinkClass} to="/login">
                <LogIn className="h-4 w-4" />
                <span>Đăng nhập</span>
              </Link>
              <Link
                className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-medium text-sm transition-colors duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
                style={{
                  background: "var(--color-accent)",
                  color: "var(--color-paper)",
                }}
                to="/signup"
              >
                <UserPlus className="h-4 w-4" />
                <span>Đăng ký</span>
              </Link>
            </>
          )}
        </nav>

        <button
          aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          className="flex cursor-pointer items-center justify-center rounded-lg p-2 transition-colors duration-150 hover:bg-[var(--color-paper-3)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          type="button"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav
          className="border-t px-4 pt-4 pb-6 md:hidden"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex flex-col gap-1">
            <Link
              className={mobileNavLinkClass}
              onClick={() => setMobileOpen(false)}
              to="/cart"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Giỏ hàng</span>
            </Link>

            {user?.role === "admin" && (
              <Link
                className={mobileNavLinkClass}
                onClick={() => setMobileOpen(false)}
                to="/secret-dashboard"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Bảng điều khiển</span>
              </Link>
            )}

            {user ? (
              <button
                className={mobileNavLinkClass}
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                style={{ color: "var(--color-error)" }}
                type="button"
              >
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất</span>
              </button>
            ) : (
              <>
                <Link
                  className={mobileNavLinkClass}
                  onClick={() => setMobileOpen(false)}
                  to="/login"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Đăng nhập</span>
                </Link>
                <Link
                  className={mobileNavLinkClass}
                  onClick={() => setMobileOpen(false)}
                  style={{ color: "var(--color-accent)" }}
                  to="/signup"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Đăng ký</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
