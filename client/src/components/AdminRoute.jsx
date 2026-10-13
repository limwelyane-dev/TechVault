import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <h2>Checking authentication...</h2>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;