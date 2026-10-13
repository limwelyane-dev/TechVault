import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/api";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";

function AllProducts() {
  const [searchParams] = useSearchParams();

  const searchQuery =
    searchParams.get("search")?.toLowerCase() || "";

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">
        Unable to load products.
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const name = product.name?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";

    return (
      name.includes(searchQuery) ||
      category.includes(searchQuery)
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 lg:px-6">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          TechVault Store
        </p>

        <h1 className="mt-2 text-3xl font-black text-slate-950">
          All Products
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Browse our complete collection of products.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default AllProducts;