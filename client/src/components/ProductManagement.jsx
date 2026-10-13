import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAllProductsForAdmin,
  restoreProduct,
  deleteProduct,
  updateProduct,
} from "../services/api";

import {
  Search,
  Package,
  Trash2,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  Pencil,
  Save,
  X,
} from "lucide-react";

function ProductManagement() {
  const queryClient = useQueryClient();

  const [processingProductId, setProcessingProductId] =
    useState(null);

  const [productError, setProductError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Edit state
  const [editingProductId, setEditingProductId] =
    useState(null);

  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: getAllProductsForAdmin,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onMutate: (productId) => {
      setProcessingProductId(productId);
      setProductError(null);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setProcessingProductId(null);
    },

    onError: (error) => {
      setProductError({
        message: error.message,
      });

      setProcessingProductId(null);
    },
  });


  const restoreMutation = useMutation({
    mutationFn: restoreProduct,

    onMutate: (productId) => {
      setProcessingProductId(productId);
      setProductError(null);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setProcessingProductId(null);
    },

    onError: (error) => {
      setProductError({
        message: error.message,
      });

      setProcessingProductId(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      productId,
      name,
      price,
      category,
    }) =>
      updateProduct(productId, {
        name,
        price: Number(price),
        category,
      }),

    onMutate: () => {
      setProductError(null);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setEditingProductId(null);
      setEditName("");
      setEditPrice("");
      setEditCategory("");
    },

    onError: (error) => {
      setProductError({
        message: error.message,
      });
    },
  });

  const handleEdit = (product) => {
    setEditingProductId(product.id);

    setEditName(product.name);
    setEditPrice(product.price);
    setEditCategory(product.category || "");

    setProductError(null);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);

    setEditName("");
    setEditPrice("");
    setEditCategory("");

    setProductError(null);
  };

  const handleSave = (productId) => {
    if (!editName.trim()) {
      setProductError({
        message: "Product name is required.",
      });

      return;
    }

    if (
      editPrice === "" ||
      Number(editPrice) < 0
    ) {
      setProductError({
        message: "Please enter a valid price.",
      });

      return;
    }

    if (!editCategory.trim()) {
      setProductError({
        message: "Category is required.",
      });

      return;
    }

    updateMutation.mutate({
      productId,
      name: editName.trim(),
      price: editPrice,
      category: editCategory.trim(),
    });
  };

  const filteredProducts = products.filter(
    (product) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(searchTerm) ||
        String(product.id).includes(searchTerm) ||
        product.category
          ?.toLowerCase()
          .includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" &&
          product.is_active) ||
        (statusFilter === "inactive" &&
          !product.is_active);

      return matchesSearch && matchesStatus;
    }
  );

  const activeCount = products.filter(
    (product) => product.is_active
  ).length;

  const inactiveCount = products.filter(
    (product) => !product.is_active
  ).length;

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

        <p className="text-sm font-medium text-slate-500">
          Loading products...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-center gap-3">
          <AlertCircle
            size={20}
            className="text-red-600"
          />

          <div>
            <h3 className="font-bold text-red-800">
              Failed to load products
            </h3>

            <p className="mt-1 text-sm text-red-600">
              {error?.message ||
                "Something went wrong."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="h-6 w-1 rounded-full bg-blue-600" />

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Inventory
            </p>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Product Management
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Manage your TechVault products,
            categories, prices, and availability.
          </p>
        </div>

        {/* Counts */}
        <div className="flex gap-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs font-medium text-slate-400">
              Active
            </p>

            <p className="text-xl font-black text-slate-900">
              {activeCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs font-medium text-slate-400">
              Inactive
            </p>

            <p className="text-xl font-black text-slate-900">
              {inactiveCount}
            </p>
          </div>
        </div>
      </div>

      {productError && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle
            size={18}
            className="shrink-0 text-red-600"
          />

          <p className="text-sm font-medium text-red-700">
            {productError.message}
          </p>

          <button
            type="button"
            onClick={() => setProductError(null)}
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by product, category, or ID..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-400 bg-slate-50 py-2 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="all">
              All Products
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead className="border-b border-slate-300 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-400">
              {filteredProducts.map((product) => {
                const isEditing =
                  editingProductId === product.id;

                const isProcessing =
                  processingProductId === product.id;

                return (
                  <tr
                    key={product.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    {/* PRODUCT */}
                    <td className="px-5 py-4">
                      {isEditing ? (
                        <div className="max-w-xs">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) =>
                              setEditName(
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10"
                            placeholder="Product name"
                          />

                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="h-full w-full object-fill transition-transform duration-300 hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                                No image available
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="font-bold text-slate-900">
                              {product.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              ID: #{product.id}
                            </p>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* CATEGORY */}
                    <td className="px-6 py-5">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editCategory}
                          onChange={(e) =>
                            setEditCategory(
                              e.target.value
                            )
                          }
                          placeholder="e.g. Electronics"
                          className="w-44 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10"
                        />
                      ) : (
                        <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                          {product.category ||
                            "Uncategorized"}
                        </span>
                      )}
                    </td>

                    {/* PRICE */}
                    <td className="px-6 py-5">
                      {isEditing ? (
                        <div className="relative w-32">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                            ₱
                          </span>

                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={editPrice}
                            onChange={(e) =>
                              setEditPrice(
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-blue-300 bg-white py-2 pl-7 pr-3 text-sm font-medium text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/10"
                          />
                        </div>
                      ) : (
                        <span className="font-bold text-slate-900">
                          ₱
                          {Number(
                            product.price
                          ).toLocaleString()}
                        </span>
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <StatusBadge
                        active={product.is_active}
                      />
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        {isEditing ? (
                          <>
                            {/* SAVE */}
                            <button
                              type="button"
                              onClick={() =>
                                handleSave(product.id)
                              }
                              disabled={
                                updateMutation.isPending
                              }
                              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Save size={15} />

                              {updateMutation.isPending
                                ? "Saving..."
                                : "Save"}
                            </button>

                            {/* CANCEL */}
                            <button
                              type="button"
                              onClick={
                                handleCancelEdit
                              }
                              disabled={
                                updateMutation.isPending
                              }
                              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <X size={15} />

                              Cancel
                            </button>
                          </>
                        ) : product.is_active ? (
                          <>
                            {/* EDIT */}
                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(product)
                              }
                              disabled={isProcessing}
                              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Pencil size={15} />

                              Edit
                            </button>

                            {/* DELETE */}
                            <button
                              type="button"
                              onClick={() =>
                                deleteMutation.mutate(
                                  product.id
                                )
                              }
                              disabled={isProcessing}
                              className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Trash2 size={15} />

                              {isProcessing
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </>
                        ) : (
                          /* RESTORE */
                          <button
                            type="button"
                            onClick={() =>
                              restoreMutation.mutate(
                                product.id
                              )
                            }
                            disabled={isProcessing}
                            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-600 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <RotateCcw size={15} />

                            {isProcessing
                              ? "Restoring..."
                              : "Restore"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* EMPTY */}
        {filteredProducts.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Package size={24} />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              No products found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Showing{" "}
          <strong className="text-slate-600">
            {filteredProducts.length}
          </strong>{" "}
          of{" "}
          <strong className="text-slate-600">
            {products.length}
          </strong>{" "}
          products
        </span>

        <span className="hidden items-center gap-1 sm:flex">
          <CheckCircle2
            size={14}
            className="text-emerald-500"
          />

          Inventory management
        </span>
      </div>
    </section>
  );
}

// ------------------------------------------
// STATUS BADGE
// ------------------------------------------

function StatusBadge({ active }) {
  return active ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      Inactive
    </span>
  );
}

export default ProductManagement;