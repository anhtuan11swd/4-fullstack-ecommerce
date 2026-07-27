import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import Navbar from "./components/Navbar.jsx";
import { AdminRoute, AuthRoute } from "./components/ProtectedRoute.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { useUserStore } from "./stores/useUserStore.js";

function App() {
  const { checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<HomePage />} path="/" />
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
