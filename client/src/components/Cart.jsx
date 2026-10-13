import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Package,
  CreditCard,
} from "lucide-react";

import { createOrder } from "../services/api";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      clearCart();
      navigate("/orders");
    },
  });

  if (cart.length === 0) {
    return (
      <div className="flex min-h-125 items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <ShoppingCart size={36} />
          </div>

          <h1 className="mt-6 text-2xl font-black text-slate-950">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            You haven't added any products to your cart yet.
            Browse our products and find something you like.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = () => {
    const items = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    mutation.mutate(items);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 lg:px-6 space-y-8">
      {/* Header */}
      <section>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          TechVault
        </p>

        <h1 className="mt-2 text-3xl font-black text-slate-950">
          Shopping Cart
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Review your products before placing your order.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Cart Items */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShoppingCart size={19} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Cart Items
                </h2>

                <p className="text-xs text-slate-500">
                  {cart.length} product
                  {cart.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <button
              onClick={clearCart}
              className="text-sm font-semibold text-red-500 transition hover:text-red-700"
            >
              Clear Cart
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {cart.map((item) => {
              const subtotal =
                Number(item.price) * item.quantity;

              return (
                <div
                  key={item.id}
                  className="p-5"
                >
                  <div className="flex gap-4">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        ₱
                        {Number(item.price).toLocaleString()}{" "}
                        × {item.quantity}
                      </p>

                      <p className="mt-2 font-bold text-slate-950">
                        ₱{subtotal.toLocaleString()}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      title="Remove product"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Order Summary */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-bold text-slate-900">
              Order Summary
            </h2>
          </div>

          <div className="space-y-4 p-5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Subtotal
              </span>

              <span className="font-semibold text-slate-900">
                ₱{total.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Shipping
              </span>

              <span className="font-semibold text-green-600">
                Free
              </span>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">
                  Total
                </span>

                <span className="text-2xl font-black text-slate-950">
                  ₱{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout */}
            <button
              onClick={handleCheckout}
              disabled={mutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CreditCard size={18} />

              {mutation.isPending
                ? "Processing Order..."
                : "Place Order"}
            </button>

            {/* Continue Shopping */}
            <button
              onClick={() => navigate("/products")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </button>

            {/* Error */}
            {mutation.isError && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                {mutation.error.message}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;