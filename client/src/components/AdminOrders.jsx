import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAllOrders,
  updateOrderStatus,
} from "../services/api";

import {
  Search,
  ShoppingBag,
  User,
  Mail,
  CalendarDays,
  Package,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  PhilippinePeso,
} from "lucide-react";

const allowedTransitions = {
  pending: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

function AdminOrders() {
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [statusError, setStatusError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });


  const orders = Array.isArray(data)
    ? data
    : data?.orders || [];

  const statusMutation = useMutation({
    mutationFn: ({ orderId, status }) =>
      updateOrderStatus(orderId, status),

    onMutate: ({ orderId }) => {
      setUpdatingOrderId(orderId);
      setStatusError(null);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-orders"],
      });
    },

    onError: (error, variables) => {
      setStatusError({
        orderId: variables.orderId,
        message:
          error?.message ||
          "Failed to update order status.",
      });
    },

    onSettled: () => {
      setUpdatingOrderId(null);
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle
            size={20}
            className="mt-0.5 text-red-600"
          />

          <div>
            <h2 className="font-semibold text-red-700">
              Failed to load orders
            </h2>

            <p className="mt-1 text-sm text-red-600">
              {error?.message ||
                "Something went wrong."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const groupedOrders = orders.reduce(
    (acc, item) => {
      const orderId = item.order_id;

      if (!acc[orderId]) {
        acc[orderId] = {
          order_id: orderId,
          created_at: item.created_at,
          status: item.status,
          customer_name: item.customer_name,
          customer_email: item.customer_email,
          items: [],
        };
      }

      acc[orderId].items.push(item);

      return acc;
    },
    {}
  );

  const orderList = Object.values(groupedOrders);


  const filteredOrders = orderList.filter(
    (order) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        String(order.order_id)
          .toLowerCase()
          .includes(searchTerm) ||
        order.customer_name
          ?.toLowerCase()
          .includes(searchTerm) ||
        order.customer_email
          ?.toLowerCase()
          .includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" ||
        order.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  if (orderList.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
            <ShoppingBag
              size={28}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            No orders yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Customer orders will appear here once
            they are placed.
          </p>
        </div>
      </div>
    );
  }

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
              Orders
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage customer orders and update
              their status.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-400 bg-white px-5 py-2 shadow-sm">
            <ShoppingBag
              size={18}
              className="text-blue-600"
            />

            <span className="text-sm font-semibold text-slate-700">
              {orderList.length}{" "}
              {orderList.length === 1
                ? "Order"
                : "Orders"}
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search order ID, customer, or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-11 w-full rounded-xl border border-slate-400 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>


          <div className="relative md:w-48">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="h-11 w-full appearance-none rounded-xl border border-slate-400 bg-slate-50 px-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="all">
                All statuses
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="processing">
                Processing
              </option>

              <option value="shipped">
                Shipped
              </option>

              <option value="delivered">
                Delivered
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>
      </section>

      {filteredOrders.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <Search
            size={30}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-bold text-slate-900">
            No matching orders
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or status
            filter.
          </p>
        </div>
      )}

      <section className="space-y-5">
        {filteredOrders.map((order) => {
          const orderTotal =
            order.items.reduce(
              (total, item) =>
                total +
                Number(item.subtotal || 0),
              0
            );

          const transitions =
            allowedTransitions[
              order.status
            ] || [];

          return (
            <div
              key={order.order_id}
              className="overflow-hidden rounded-2xl border border-slate-500 bg-white shadow-sm"
            >

              <div className="border-b border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Order info */}

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <ShoppingBag size={21} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-bold text-slate-950">
                          Order #{order.order_id}
                        </h2>

                        <StatusBadge
                          status={order.status}
                        />
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays
                            size={14}
                          />

                          {new Date(
                            order.created_at
                          ).toLocaleString()}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Package
                            size={14}
                          />

                          {order.items.length}{" "}
                          {order.items.length ===
                          1
                            ? "item"
                            : "items"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* STATUS CONTROL */}

                  <div>
                    {transitions.length > 0 ? (
                      <div className="relative">
                        <select
                          value=""
                          onChange={(e) => {
                            if (
                              !e.target.value
                            ) {
                              return;
                            }

                            statusMutation.mutate(
                              {
                                orderId:
                                  order.order_id,
                                status:
                                  e.target
                                    .value,
                              }
                            );
                          }}
                          disabled={
                            updatingOrderId ===
                            order.order_id
                          }
                          className="h-10 min-w-44 appearance-none rounded-lg border border-slate-400 bg-white px-3 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <option
                            value=""
                            disabled
                          >
                            {updatingOrderId ===
                            order.order_id
                              ? "Updating..."
                              : "Change status"}
                          </option>

                          {transitions.map(
                            (nextStatus) => (
                              <option
                                key={nextStatus}
                                value={nextStatus}
                              >
                                {formatStatus(
                                  nextStatus
                                )}
                              </option>
                            )
                          )}
                        </select>

                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">
                        No further changes
                      </span>
                    )}
                  </div>
                </div>

                {/* STATUS ERROR */}

                {statusError?.orderId ===
                  order.order_id && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                    <AlertCircle size={16} />

                    {statusError.message}
                  </div>
                )}
              </div>

              {/* CUSTOMER */}

              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <User size={17} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Customer
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                      {order.customer_name ||
                        "Unknown customer"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <Mail size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Email
                    </p>

                    <p className="mt-0.5 truncate text-sm font-medium text-slate-700">
                      {order.customer_email ||
                        "No email"}
                    </p>
                  </div>
                </div>
              </div>

              {/* ITEMS */}

              <div className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Order Items
                  </h3>

                  <span className="text-xs text-slate-400">
                    {order.items.length}{" "}
                    {order.items.length === 1
                      ? "product"
                      : "products"}
                  </span>
                </div>

                <div className="space-y-3">
                  {order.items.map(
                    (item, index) => (
                      <div
                        key={`${order.order_id}-${item.product_id}-${index}`}
                        className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-400">
                            <Package size={18} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {item.product_name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              ₱
                              {Number(
                                item.price ||
                                  0
                              ).toLocaleString(
                                "en-PH",
                                {
                                  minimumFractionDigits: 2,
                                }
                              )}{" "}
                              ×{" "}
                              {item.quantity}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm font-bold text-slate-900 sm:text-right">
                          ₱
                          {Number(
                            item.subtotal || 0
                          ).toLocaleString(
                            "en-PH",
                            {
                              minimumFractionDigits: 2,
                            }
                          )}
                        </p>
                      </div>
                    )
                  )}
                </div>

                {/* TOTAL */}

                <div className="mt-5 flex items-end justify-end  border-t border-slate-200 pt-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Order Total
                    </p>

                    <p className="mt-1 text-xl font-black text-slate-950">
                      ₱
                      {orderTotal.toLocaleString(
                        "en-PH",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function formatStatus(status) {
  return (
    status.charAt(0).toUpperCase() +
    status.slice(1)
  );
}

function StatusBadge({ status }) {
  const config = {
    pending: {
      label: "Pending",
      icon: Clock3,
      className:
        "bg-amber-50 text-amber-700 ring-amber-600/10",
    },

    processing: {
      label: "Processing",
      icon: Package,
      className:
        "bg-blue-50 text-blue-700 ring-blue-600/10",
    },

    shipped: {
      label: "Shipped",
      icon: Truck,
      className:
        "bg-violet-50 text-violet-700 ring-violet-600/10",
    },

    delivered: {
      label: "Delivered",
      icon: CheckCircle2,
      className:
        "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    },

    cancelled: {
      label: "Cancelled",
      icon: XCircle,
      className:
        "bg-red-50 text-red-700 ring-red-600/10",
    },
  };

  const current = config[status] || {
    label: status,
    icon: Clock3,
    className:
      "bg-slate-50 text-slate-600 ring-slate-500/10",
  };

  const Icon = current.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        ring-1
        ring-inset
        ${current.className}
      `}
    >
      <Icon size={13} />

      {current.label}
    </span>
  );
}

export default AdminOrders;