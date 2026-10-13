import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Package,
  LayoutDashboard,
  Settings,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

import { Link, Outlet, useLocation, useNavigate, } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Footer from "./footer";

function Layout() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMenus = () => {
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    navigate(
      `/all-products?search=${encodeURIComponent(value)}`
    );

    setSearch("");
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950">

        <div className="mx-auto flex h-18 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

          <Link
            to="/products"
            onClick={closeMenus}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/20">
              T{"<"}
            </div>

            <div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                TECH
                <span className="text-blue-500 text-sm">VAULT</span>
              </span>

              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Electronics Store
              </p>
            </div>
          </Link>

          <div className="mx-8 hidden flex-1 md:block">
            <form
              onSubmit={handleSearch}
              className="relative mx-auto max-w-xl"
            >
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="
                  h-11 w-full rounded-xl
                  border border-slate-800
                  bg-slate-900
                  pl-11 pr-4
                  text-sm text-white
                  outline-none
                  placeholder:text-slate-500
                  transition
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </form>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">

            <Link
              to="/products"
              className={`
                rounded-lg px-4 py-2 text-sm font-medium transition
                ${
                  isActive("/products")
                    ? "bg-blue-600/10 text-blue-400"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }
              `}
            >
              Home
            </Link>

            {/* Shop */}
            <Link
              to="/all-products"
              className={`
                rounded-lg px-4 py-2 text-sm font-medium transition
                ${
                  isActive("/all-products")
                    ? "bg-blue-600/10 text-blue-400"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }
              `}
            >
              Shop
            </Link>


            {/* Orders */}
            <Link
              to="/orders"
              className={`
                rounded-lg px-4 py-2 text-sm font-medium transition
                ${
                  isActive("/orders")
                    ? "bg-blue-600/10 text-blue-400"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }
              `}
            >
              Orders
            </Link>

          </nav>


          {/* =================================================
              RIGHT SIDE
          ================================================== */}
          <div className="ml-auto flex items-center gap-2">


            {/* =================================================
                CART
            ================================================== */}
            <Link
              to="/cart"
              className="
                relative flex h-10 w-10
                items-center justify-center
                rounded-xl
                text-slate-300
                transition
                hover:bg-slate-900
                hover:text-white
              "
            >

              <ShoppingCart size={20} />

              {/* Cart count */}
              <span
                className="
                  absolute -right-0.5 -top-0.5
                  flex h-4 min-w-4
                  items-center justify-center
                  rounded-full
                  bg-blue-600
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                { cartCount }
              </span>

            </Link>


            {/* Divider */}
            <div className="mx-2 hidden h-7 w-px bg-slate-800 sm:block" />


            {/* =================================================
                DESKTOP PROFILE
            ================================================== */}
            <div className="relative hidden sm:block">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="
                  flex items-center gap-3
                  rounded-xl
                  px-2 py-1.5
                  transition
                  hover:bg-slate-900
                "
              >

                {/* Avatar */}
                <div
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-lg
                    bg-blue-600/15
                    text-blue-400
                  "
                >
                  <User size={18} />
                </div>


                {/* User information */}
                <div className="hidden text-left xl:block">

                  <p className="max-w-24 truncate text-xs font-semibold text-white">
                    {user?.name || "Account"}
                  </p>

                  <p className="text-[10px] text-slate-500">
                    {user?.role === "admin"
                      ? "Administrator"
                      : "Customer"}
                  </p>

                </div>


                <ChevronDown
                  size={15}
                  className={`text-slate-500 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />

              </button>


              {/* =================================================
                  PROFILE DROPDOWN
              ================================================== */}
              {profileOpen && (

                <div
                  className="
                    absolute right-0 top-14
                    w-64
                    overflow-hidden
                    rounded-2xl
                    border border-slate-800
                    bg-slate-950
                    shadow-2xl
                    shadow-black/30
                  "
                >

                  {/* =========================================
                      USER INFORMATION
                  ========================================== */}
                  <div className="border-b border-slate-800 px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          flex h-10 w-10
                          items-center justify-center
                          rounded-xl
                          bg-blue-600/15
                          text-blue-400
                        "
                      >
                        <User size={19} />
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-white">
                          {user?.name || "My Account"}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          {user?.email}
                        </p>

                      </div>

                    </div>


                    {/* Role badge */}
                    <div className="mt-3">

                      <span
                        className="
                          inline-flex
                          rounded-full
                          bg-blue-500/10
                          px-2.5 py-1
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wide
                          text-blue-400
                        "
                      >
                        {user?.role === "admin"
                          ? "Administrator"
                          : "Customer"}
                      </span>

                    </div>

                  </div>


                  {/* =========================================
                      CUSTOMER ACCOUNT
                  ========================================== */}
                  <div className="p-2">

                    <p
                      className="
                        px-3 pb-2 pt-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-widest
                        text-slate-600
                      "
                    >
                      Account
                    </p>


                    {/* My Orders */}
                    <Link
                      to="/orders"
                      onClick={closeMenus}
                      className="
                        flex items-center gap-3
                        rounded-lg px-3 py-2.5
                        text-sm text-slate-300
                        transition
                        hover:bg-slate-900
                        hover:text-white
                      "
                    >
                      <Package size={17} />

                      My Orders
                    </Link>

                    <Link
                      to="/"
                      className="
                        flex items-center gap-3
                        rounded-lg px-3 py-2.5
                        text-sm text-slate-300
                        transition
                        hover:bg-slate-900
                        hover:text-white
                      "
                    >
                      <Settings size={17} />

                      Settings
                    </Link>

                  </div>


                  {/* =========================================
                      ADMIN SECTION
                  ========================================== */}
                  {user?.role === "admin" && (

                    <div className="border-t border-slate-800 p-2">

                      <p
                        className="
                          px-3 pb-2 pt-1
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-widest
                          text-slate-600
                        "
                      >
                        Administration
                      </p>


                      {/* Dashboard */}
                      <Link
                        to="/admin"
                        onClick={closeMenus}
                        className="
                          flex items-center gap-3
                          rounded-lg px-3 py-2.5
                          text-sm text-slate-300
                          transition
                          hover:bg-blue-500/10
                          hover:text-blue-400
                        "
                      >
                        <LayoutDashboard size={17} />

                        Dashboard
                      </Link>


                      {/* Products Management */}
                      <Link
                        to="/admin/products"
                        onClick={closeMenus}
                        className="
                          flex items-center gap-3
                          rounded-lg px-3 py-2.5
                          text-sm text-slate-300
                          transition
                          hover:bg-blue-500/10
                          hover:text-blue-400
                        "
                      >
                        <Settings size={17} />

                        Products Management
                      </Link>


                      {/* Orders Management */}
                      <Link
                        to="/admin/orders"
                        onClick={closeMenus}
                        className="
                          flex items-center gap-3
                          rounded-lg px-3 py-2.5
                          text-sm text-slate-300
                          transition
                          hover:bg-blue-500/10
                          hover:text-blue-400
                        "
                      >
                        <ShieldCheck size={17} />

                        Orders Management
                      </Link>

                    </div>

                  )}


                  {/* =========================================
                      LOGOUT
                  ========================================== */}
                  <div className="border-t border-slate-800 p-2">

                    <button
                      onClick={logout}
                      className="
                        flex w-full items-center gap-3
                        rounded-lg px-3 py-2.5
                        text-sm text-red-400
                        transition
                        hover:bg-red-500/10
                      "
                    >
                      <LogOut size={17} />

                      Sign out
                    </button>

                  </div>

                </div>

              )}

            </div>


            {/* =================================================
                MOBILE MENU BUTTON
            ================================================== */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                text-slate-300
                transition
                hover:bg-slate-900
                hover:text-white
                lg:hidden
              "
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>

          </div>

        </div>


        {/* =====================================================
            MOBILE MENU
        ====================================================== */}
        {mobileMenuOpen && (

          <div
            className="
              border-t border-slate-800
              bg-slate-950
              px-4 pb-4
              lg:hidden
            "
          >

            <div className="space-y-1 pt-3">
              {/* Mobile Search */}
              <div className="relative mb-3 md:hidden">
                <form onSubmit={handleSearch}>
                  <Search
                    size={18}
                    className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-slate-500
                    "
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="
                      h-11 w-full rounded-xl
                      border border-slate-800
                      bg-slate-900
                      pl-11 pr-4
                      text-sm text-white
                      outline-none
                      placeholder:text-slate-500
                      focus:border-blue-500
                    "
                  />
                </form>
              </div>


              {/* Shop */}
              <Link
                to="/products"
                onClick={closeMenus}
                className="
                  flex items-center gap-3
                  rounded-xl px-4 py-3
                  text-sm font-medium
                  text-slate-300
                  transition
                  hover:bg-slate-900
                  hover:text-white
                "
              >
                <Package size={18} />

                Shop
              </Link>


              {/* Orders */}
              <Link
                to="/orders"
                onClick={closeMenus}
                className="
                  flex items-center gap-3
                  rounded-xl px-4 py-3
                  text-sm font-medium
                  text-slate-300
                  transition
                  hover:bg-slate-900
                  hover:text-white
                "
              >
                <Package size={18} />

                My Orders
              </Link>


              {/* Cart */}
              <Link
                to="/cart"
                onClick={closeMenus}
                className="
                  flex items-center gap-3
                  rounded-xl px-4 py-3
                  text-sm font-medium
                  text-slate-300
                  transition
                  hover:bg-slate-900
                  hover:text-white
                "
              >
                <ShoppingCart size={18} />

                Cart
                <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  0
                </span>

              </Link>


              {/* =============================================
                  MOBILE ADMIN
              ============================================== */}
              {user?.role === "admin" && (

                <>
                  <div className="my-3 border-t border-slate-800" />


                  <p
                    className="
                      px-4 pb-2
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-widest
                      text-slate-500
                    "
                  >
                    Administration
                  </p>


                  {/* Dashboard */}
                  <Link
                    to="/admin"
                    onClick={closeMenus}
                    className="
                      flex items-center gap-3
                      rounded-xl px-4 py-3
                      text-sm font-medium
                      text-slate-300
                      transition
                      hover:bg-slate-900
                      hover:text-white
                    "
                  >
                    <LayoutDashboard size={18} />

                    Dashboard
                  </Link>


                  {/* Products Management */}
                  <Link
                    to="/admin/products"
                    onClick={closeMenus}
                    className="
                      flex items-center gap-3
                      rounded-xl px-4 py-3
                      text-sm font-medium
                      text-slate-300
                      transition
                      hover:bg-slate-900
                      hover:text-white
                    "
                  >
                    <Settings size={18} />

                    Products Management
                  </Link>


                  {/* Orders Management */}
                  <Link
                    to="/admin/orders"
                    onClick={closeMenus}
                    className="
                      flex items-center gap-3
                      rounded-xl px-4 py-3
                      text-sm font-medium
                      text-slate-300
                      transition
                      hover:bg-slate-900
                      hover:text-white
                    "
                  >
                    <ShieldCheck size={18} />

                    Orders Management
                  </Link>

                </>

              )}


              {/* Divider */}
              <div className="my-3 border-t border-slate-800" />


              {/* Logout */}
              <button
                onClick={logout}
                className="
                  flex w-full items-center gap-3
                  rounded-xl px-4 py-3
                  text-sm font-medium
                  text-red-400
                  transition
                  hover:bg-red-500/10
                "
              >
                <LogOut size={18} />

                Sign out
              </button>

            </div>

          </div>

        )}

      </header>

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default Layout;