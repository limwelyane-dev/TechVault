import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
  getRecentOrders,
} from "../services/api";

import {
  Package,
  ShoppingCart,
  Clock3,
  Users,
  PhilippinePeso,
  Boxes,
  Plus,
  ArrowRight,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

function AdminDashboard() {
  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  const {
    data: recentOrders,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useQuery({
    queryKey: ["recent-orders"],
    queryFn: getRecentOrders,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Failed to load dashboard
        </h2>

        <p className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Products",
      value: stats.total_products,
      icon: Package,
      description: "All products",
    },
    {
      title: "Active Products",
      value: stats.active_products,
      icon: Boxes,
      description: "Currently active",
    },
    {
      title: "Total Orders",
      value: stats.total_orders,
      icon: ShoppingCart,
      description: "All orders",
    },
    {
      title: "Pending Orders",
      value: stats.pending_orders,
      icon: Clock3,
      description: "Need attention",
    },
    {
      title: "Customers",
      value: stats.total_customers,
      icon: Users,
      description: "Registered customers",
    },
    {
      title: "Revenue",
      value: `₱${Number(stats.total_revenue).toLocaleString(
        "en-PH",
        {
          minimumFractionDigits: 2,
        }
      )}`,
      icon: PhilippinePeso,
      description: "Total revenue",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 lg:px-6 space-y-8">

      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-6 w-1 rounded-full bg-blue-600" />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Administration
              </p>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Monitor your TechVault store and manage your business.
            </p>
          </div>

          <Link
            to="/admin/products"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition
              hover:bg-blue-500
            "
          >
            <Plus size={17} />
            Add Product
          </Link>
        </div>
      </section>

      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-300
                  bg-white
                  p-4
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  hover:shadow-slate-200/60
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {card.title}
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                      {card.value}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      {card.description}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      transition
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >
                    <Icon size={21} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-950">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly access common store management tasks.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            to="/admin/products"
            className="
              group
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-slate-400
              bg-white
              p-5
              shadow-sm
              transition
              hover:border-blue-200
              hover:shadow-lg
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                "
              >
                <Package size={21} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Manage Products
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Add, edit, or remove products
                </p>
              </div>
            </div>

            <ArrowRight
              size={19}
              className="
                text-slate-400
                transition
                group-hover:translate-x-1
                group-hover:text-blue-600
              "
            />
          </Link>

          <Link
            to="/admin/orders"
            className="
              group
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-slate-400
              bg-white
              p-5
              shadow-sm
              transition
              hover:border-blue-200
              hover:shadow-lg
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                "
              >
                <ShoppingCart size={21} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Manage Orders
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Review and update customer orders
                </p>
              </div>
            </div>

            <ArrowRight
              size={19}
              className="
                text-slate-400
                transition
                group-hover:translate-x-1
                group-hover:text-blue-600
              "
            />
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Recent Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest customer orders in your store.
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="
              hidden
              items-center
              gap-1
              text-sm
              font-semibold
              text-blue-600
              transition
              hover:text-blue-500
              sm:flex
            "
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-400
            bg-white
            shadow-sm
          "
        >
          {ordersLoading && (
            <div className="p-8 text-center">
              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />

              <p className="mt-3 text-sm text-slate-500">
                Loading recent orders...
              </p>
            </div>
          )}

          {ordersError && (
            <div className="p-8 text-center">
              <p className="text-sm font-medium text-red-500">
                Failed to load recent orders.
              </p>
            </div>
          )}

          {!ordersLoading &&
            !ordersError &&
            recentOrders?.length === 0 && (
              <div className="p-10 text-center">
                <ShoppingCart
                  size={32}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-medium text-slate-600">
                  No orders yet.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Customer orders will appear here.
                </p>
              </div>
            )}

          {!ordersLoading &&
            !ordersError &&
            recentOrders?.length > 0 && (
              <>
                {/* Desktop table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-300 bg-slate-50">
                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Order
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Customer
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Date
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Total
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Status
                        </th>

                        <th className="px-5 py-4" />
                      </tr>
                    </thead>

                    <tbody>
                      {recentOrders.map((order) => (
                        <tr
                          key={order.order_id}
                          className="
                            border-b
                            border-slate-100
                            last:border-0
                            hover:bg-slate-50
                          "
                        >
                          <td className="px-5 py-4">
                            <span className="font-semibold text-slate-900">
                              #{order.order_id}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span className="text-sm font-medium text-slate-700">
                              {order.customer_name}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span className="text-sm text-slate-500">
                              {new Date(
                                order.created_at
                              ).toLocaleDateString()}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span className="text-sm font-bold text-slate-900">
                              ₱
                              {Number(order.total).toLocaleString(
                                "en-PH",
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <StatusBadge status={order.status} />
                          </td>

                          <td className="px-5 py-4 text-right">
                            <Link
                              to="/admin/orders"
                              className="
                                inline-flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                text-slate-400
                                transition
                                hover:bg-slate-100
                                hover:text-slate-700
                              "
                            >
                              <MoreHorizontal size={18} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="divide-y divide-slate-100 md:hidden">
                  {recentOrders.map((order) => (
                    <div
                      key={order.order_id}
                      className="p-5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-slate-900">
                            Order #{order.order_id}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {order.customer_name}
                          </p>
                        </div>

                        <StatusBadge status={order.status} />
                      </div>

                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-xs text-slate-400">
                            {new Date(
                              order.created_at
                            ).toLocaleString()}
                          </p>

                          <p className="mt-1 text-lg font-black text-slate-950">
                            ₱
                            {Number(order.total).toLocaleString(
                              "en-PH",
                              {
                                minimumFractionDigits: 2,
                              }
                            )}
                          </p>
                        </div>

                        <Link
                          to="/admin/orders"
                          className="text-sm font-semibold text-blue-600"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
        </div>

        {/* Mobile View All */}
        <Link
          to="/admin/orders"
          className="
            mt-4
            flex
            items-center
            justify-center
            gap-1
            rounded-xl
            border
            border-slate-200
            bg-white
            py-3
            text-sm
            font-semibold
            text-blue-600
            sm:hidden
          "
        >
          View All Orders
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-50 text-amber-700 ring-amber-600/10",
    processing: "bg-blue-50 text-blue-700 ring-blue-600/10",
    shipped: "bg-violet-50 text-violet-700 ring-violet-600/10",
    delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    cancelled: "bg-red-50 text-red-700 ring-red-600/10",
  };

  const style =
    styles[status?.toLowerCase()] ||
    "bg-slate-50 text-slate-600 ring-slate-500/10";

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        capitalize
        ring-1
        ring-inset
        ${style}
      `}
    >
      {status}
    </span>
  );
}

export default AdminDashboard;