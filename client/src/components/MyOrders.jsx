
import { useMemo } from "react";
import ReviewForm from "./ReviewForm";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getMyOrders,
  deleteOrder,
} from "../services/api";

import {
  Package,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  CalendarDays,
  Trash2,
} from "lucide-react";

function MyOrders() {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });

  const groupedOrders = useMemo(() => {
    if (!orders) return [];

    const grouped = {};

    orders.forEach((item) => {
      if (!grouped[item.order_id]) {
        grouped[item.order_id] = {
          order_id: item.order_id,
          status: item.status,
          created_at: item.created_at,
          items: [],
        };
      }

      grouped[item.order_id].items.push(item);
    });

    return Object.values(grouped);
  }, [orders]);

  if (isLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-bold text-red-700">
          Unable to load orders
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error.message}
        </p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <Package size={26} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900">
          You have no orders yet
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Your orders will appear here after you complete a purchase.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 lg:px-6 space-y-8">
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          Account
        </p>

        <h1 className="mt-2 text-3xl font-black text-slate-950">
          My Orders
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Track and review your TechVault purchases.
        </p>
      </section>

      <section className="space-y-5">
        {groupedOrders.map((order) => (
          <OrderCard
            key={order.order_id}
            order={order}
          />
        ))}
      </section>
    </div>
  );
}

function OrderCard({ order }) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-orders"],
      });
    },
  });

  const total = order.items.reduce(
    (sum, item) => sum + Number(item.subtotal),
    0
  );

  const canDelete =
    order.status === "delivered" ||
    order.status === "cancelled";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-400 bg-white shadow-sm">
      {/* Order Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Package size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Order
              </p>

              <h2 className="font-bold text-slate-900">
                #{order.order_id}
              </h2>
            </div>

            <StatusBadge status={order.status} />
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={15} />

            {new Date(order.created_at).toLocaleString()}
          </div>
        </div>

        {canDelete && (
          <button
            type="button"
            onClick={() =>
              deleteMutation.mutate(order.order_id)
            }
            disabled={deleteMutation.isPending}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={16} />

            {deleteMutation.isPending
              ? "Deleting..."
              : "Delete Order"}
          </button>
        )}
      </div>

      {/* Delete Error */}
      {deleteMutation.isError && (
        <div className="border-b border-red-100 bg-red-50 px-5 py-3">
          <p className="text-sm font-medium text-red-600">
            {deleteMutation.error.message}
          </p>
        </div>
      )}

    
      <div className="divide-y divide-slate-100">
        {order.items.map((item, index) => (
          <div
            key={`${order.order_id}-${item.product_id ?? item.product_name}-${index}`}
            className="p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-900">
                  {item.product_name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="shrink-0 font-bold text-slate-900">
                ₱{Number(item.subtotal).toLocaleString()}
              </p>
            </div>


            {order.status === "delivered" && (
              item.has_reviewed ? (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">
                  <CheckCircle2 size={18} />
                  Review submitted
                </div>
              ) : (
                <ReviewForm
                  key={`${order.order_id}-${item.product_id}`}
                  productId={item.product_id}
                  orderId={order.order_id}
                  productName={item.product_name}
                  onSuccess={() => {
                    queryClient.invalidateQueries({
                      queryKey: ["my-orders"],
                    });
                  }}
                />
              )
            )}

          </div>
        ))}
      </div>


      {/* Order Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-4">
        <span className="text-sm font-semibold text-slate-500">
          Order Total
        </span>

        <span className="text-lg font-black text-slate-950">
          ₱{total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: {
      icon: <Clock3 size={15} />,
      className: "bg-amber-50 text-amber-700",
      label: "Pending",
    },

    processing: {
      icon: <Package size={15} />,
      className: "bg-blue-50 text-blue-700",
      label: "Processing",
    },

    shipped: {
      icon: <Truck size={15} />,
      className: "bg-purple-50 text-purple-700",
      label: "Shipped",
    },

    delivered: {
      icon: <CheckCircle2 size={15} />,
      className: "bg-green-50 text-green-700",
      label: "Delivered",
    },

    cancelled: {
      icon: <XCircle size={15} />,
      className: "bg-red-50 text-red-700",
      label: "Cancelled",
    },
  };

  const current = styles[status] || {
    icon: <Package size={15} />,
    className: "bg-slate-100 text-slate-600",
    label: status,
  };

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${current.className}`}
    >
      {current.icon}
      {current.label}
    </span>
  );
}

export default MyOrders;
