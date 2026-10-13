import { useState } from "react";
import toast from "react-hot-toast";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import {
  ShoppingCart,
  Pencil,
  Trash2,
  Save,
  X,
  Package,
  Star,
} from "lucide-react";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const queryClient = useQueryClient();

  return (
    <div className="group overflow-hidden mt-4 rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="w-full h-40 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-fill transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No image available
          </div>
        )}
      </div>

      <div className="p-5">
        <div >
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            TechVault
          </p>

          <h2 className="mt-1 line-clamp-2 min-h-14 text-lg font-bold text-slate-900">
            {product.name}
          </h2>
        </div>

        <div className="mb-4 flex items-center gap-2 italic text-sm">
          <div className="flex items-center gap-1">
            <Star
              size={15}
              className={
                Number(product.average_rating) > 0
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300"
              }
            />

            <span className="font-bold text-slate-800">
              {Number(product.average_rating) > 0
                ? Number(product.average_rating).toFixed(1)
                : "No ratings"}
            </span>
          </div>

          <span className="text-slate-400">
            (
            {Number(product.review_count) || 0}{" "}
            {Number(product.review_count) === 1
              ? "review"
              : "reviews"}
            )
          </span>
        </div>


        <p className="mb-5 text-xl font-black text-slate-950">
          ₱{Number(product.price).toLocaleString()}
        </p>

        <button
          onClick={() => {
            addToCart(product);
            toast.success(`${product.name} added to cart!`);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <ShoppingCart size={17} />
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;