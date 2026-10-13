import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../services/api";
import ProductCard from "./ProductCard";

import { Package, ArrowRight } from "lucide-react";

function getCategoryImage(category){
  switch(category.toLowerCase()) {
    case "laptop":
      return "/categoryImage/lapptop.jpg";

    case "smartphone":
      return "/categoryImage/phone.jpg";
    
    case "smartwatches":
      return "/categoryImage/Apple Watch Series 9.png";
      
    case "accessories":
      return "/categoryImage/accessories.jpg";

    default:
      return "/categoryImage/defaultImage.png";
  }
}

function ProductList() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <h2 className="font-bold text-red-700">
          Unable to load products
        </h2>

        <p className="mt-2 text-sm text-red-600">
          {error.message}
        </p>
      </div>
    );
  }

  const productList = products ?? [];

  // Get unique categories
  const categories = [
    "All",
    ...new Set(
      productList
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // Filter by category
  const filteredProducts =
    selectedCategory === "All"
      ? productList
      : productList.filter(
          (product) =>
            product.category === selectedCategory
        );

  // Only show 4 products
  const displayedProducts = filteredProducts.slice(0, 5);

  return (
    <div>
      <section className="mx-auto max-w-full px-4 py-6 sm:px-10 lg:px-18 bg-slate-800">
        <div
          className="relative overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-16"
          style={{
            backgroundImage: "url('/heroBackground.png')",
          }}
        >
              <div className="relative z-10 max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                  TechVault
                </p>
      
                <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  Upgrade Your
                  <span className="block text-blue-500">
                    Digital Life
                  </span>
                </h1>
      
                <p className="mt-5 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                  Discover quality electronics and accessories
                  built for work, entertainment, gaming, and
                  everyday life.
                </p>
      
                <Link
                  to="/all-products"
                  className="mt-8 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Shop Now
                </Link>
              </div>
            </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 lg:px-6 space-y-8">
        <section>
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Browse
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Shop by Category
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <CategoryCard
                key={category}
                name={category}
                selected={selectedCategory === category}
                onClick={() =>
                  setSelectedCategory(category)
                }
              />
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                TechVault Store
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Featured Products
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Explore our latest products.
              </p>
            </div>

            <div className="flex flex-row gap-4">
              <span className="text-sm font-medium text-slate-500">
                Showing {displayedProducts.length} of{" "}
                {filteredProducts.length} products
              </span>
              <div>
                  <Link
                    to="/all-products"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-blue-600"
                  >
                    See All

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
            </div>

          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <p className="font-semibold text-slate-700">
                No products found.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                No products are available in the{" "}
                {selectedCategory} category.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 xl:grid-cols-5">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}


function CategoryCard({
  name,
  selected,
  onClick,
}) {
  const image = getCategoryImage(name);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group overflow-hidden rounded-2xl border
        text-left transition duration-300
        hover:-translate-y-1 hover:shadow-lg
        ${
          selected
            ? "border-blue-600 bg-blue-50 shadow-md"
            : "border-slate-200 bg-white hover:border-blue-300"
        }
      `}
    >
      {/* Category Image */}
      <div className="flex h-18 items-center justify-center bg-slate-50 p-3">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Category Name */}
      <div
        className={`px-4 py-3 text-center text-sm font-bold ${
          selected
            ? "text-blue-600"
            : "text-slate-700"
        }`}
      >
        {name}
      </div>
    </button>
  );
}


export default ProductList;