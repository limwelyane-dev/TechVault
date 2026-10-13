import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProductList from "./components/ProductList";
import MyOrders from "./components/MyOrders";
import Cart from "./components/Cart";

import AdminDashboard from "./components/AdminDashboard";
import AdminProducts from "./components/AdminProducts";
import AdminOrders from "./components/AdminOrders";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AuthLayout from "./components/AuthPage";
import AllProducts from "./components/AllProducts";


function App() {
  return (
    <>
      <Toaster position="top-center" />

      <BrowserRouter>
        <Routes>

          {/* Public */}
          <Route path="/login" element={
            <AuthLayout>
              <Login />
            </AuthLayout>} />

          <Route path="/signup" element={
            <AuthLayout>
              <SignUp />
            </AuthLayout>} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>

              <Route
                path="/products"
                element={<ProductList />}
              />

              <Route
              path="/all-products"
              element={<AllProducts />}
              />
            
              <Route
                path="/orders"
                element={<MyOrders />}
              />

              <Route
                path="/cart"
                element={<Cart />}
              />

              {/* Admin */}
              <Route element={<AdminRoute />}>

                <Route
                  path="/admin"
                  element={<AdminDashboard />}
                />

                <Route
                  path="/admin/products"
                  element={<AdminProducts />}
                />

                <Route
                  path="/admin/orders"
                  element={<AdminOrders />}
                />

              </Route>

            </Route>
          </Route>

          {/* Default */}
          <Route
            path="*"
            element={<Navigate to="/products" replace />}
          />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;