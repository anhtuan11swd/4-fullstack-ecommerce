import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore.js";

export function ProtectedRoute({ children }) {
  const { user } = useUserStore();
  if (!user) return <Navigate replace to="/login" />;
  return children;
}

export function AuthRoute({ children }) {
  const { user } = useUserStore();
  if (user) return <Navigate replace to="/" />;
  return children;
}

export function AdminRoute({ children }) {
  const { user } = useUserStore();
  if (!user) return <Navigate replace to="/login" />;
  if (user.role !== "admin") return <Navigate replace to="/" />;
  return children;
}
