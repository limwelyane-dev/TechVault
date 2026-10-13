import AddProduct from "./AddProduct";
import ProductManagement from "./ProductManagement";

function AdminProducts() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 lg:px-6 space-y-8">

      {/* Page Header */}
      <section>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-6 w-1 rounded-full bg-blue-600" />

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Administration
          </p>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Products
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your TechVault inventory and products.
        </p>
      </section>

      <AddProduct />

      <ProductManagement />

    </div>
  );
}

export default AdminProducts;