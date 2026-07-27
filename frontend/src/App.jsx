import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import Navbar from "./components/Navbar.jsx";
import { AdminRoute, AuthRoute } from "./components/ProtectedRoute.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PurchaseCancelPage from "./pages/PurchaseCancelPage.jsx";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { useCartStore } from "./stores/useCartStore.js";
import { useUserStore } from "./stores/useUserStore.js";

function App() {
  const { checkAuth, checkingAuth, user } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) getCartItems();
  }, [user, getCartItems]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<CategoryPage />} path="/category/:category" />
        <Route element={<CartPage />} path="/cart" />
        <Route element={<PurchaseSuccessPage />} path="/purchase-success" />
        <Route element={<PurchaseCancelPage />} path="/purchase-cancel" />
        <Route
          element={
            <AuthRoute>
              <SignUpPage />
            </AuthRoute>
          }
          path="/signup"
        />
        <Route
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
          path="/login"
        />
        <Route
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
          path="/secret-dashboard"
        />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "var(--color-paper)",
            border: "1px solid var(--color-border)",
            color: "var(--color-ink)",
            fontSize: "var(--text-sm)",
          },
        }}
      />
    </>
  );
}

export default App;
