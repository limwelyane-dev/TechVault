import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createProduct, uploadProductImage } from "../services/api";

import {
  PackagePlus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setForm({
        name: "",
        price: "",
        category: "",
      });
      
      setImage(null);
      setImagePreview("");
    },
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (image) {
        setIsUploading(true);

        try {
          const uploadResult = await uploadProductImage(image);
          
          imageUrl = uploadResult.imageUrl;
          
        } finally {
          setIsUploading(false);
        }
      }

      const normalizedCategory =
        form.category.trim().charAt(0).toUpperCase() +
        form.category.trim().slice(1).toLowerCase();

      mutation.mutate({
        name: form.name,
        price: Number(form.price),
        category: normalizedCategory,
        image_url: imageUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Header */}
      <div
        className="
          flex
          items-center
          gap-4
          border-b
          border-slate-200
          bg-slate-50/70
          px-4
          py-4
          sm:px-6
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-blue-600
          "
        >
          <PackagePlus size={21} />
        </div>

        <div>
          <h2 className="font-bold text-slate-950">
            Add Product
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Add a new product to your TechVault inventory.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-5 sm:p-6"
      >

        <div className="grid gap-5 sm:grid-cols-2">

          {/* Product Name */}
          <div>
            <label
              htmlFor="product-name"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Product Name
            </label>

            <input
              id="product-name"
              name="name"
              type="text"
              placeholder="e.g. MacBook Air M2"
              value={form.name}
              onChange={handleChange}
              required
              className="
                h-10
                w-full
                rounded-xl
                border
                border-slate-400
                bg-slate-50
                px-6
                text-sm
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10
              "
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="product-price"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Price
            </label>

            <div className="relative">
              <span
                className="
                  absolute
                  left-6
                  top-1/2
                  -translate-y-1/2
                  text-sm
                  font-semibold
                  text-slate-400
                "
              >
                ₱
              </span>

              <input
                id="product-price"
                name="price"
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
                className="
                  h-10
                  w-full
                  rounded-xl
                  border
                  border-slate-400
                  bg-slate-50
                  pl-9
                  pr-4
                  text-sm
                  text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="product-category"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-700
              "
            >
              Category
            </label>

            <input
              id="product-category"
              name="category"
              type="text"
              placeholder="e.g. Electronics"
              value={form.category}
              onChange={handleChange}
              required
              className="
                h-10
                w-full
                rounded-xl
                border
                border-slate-400
                bg-slate-50
                px-4
                text-sm
                text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-blue-500
                focus:bg-white
                focus:ring-4
                focus:ring-blue-500/10
              "
            />
          </div>

          <div>
            <label
              htmlFor="product-image"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Product Image
            </label>

            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full rounded-xl border border-slate-400 bg-slate-50 p-2 text-sm"
            />

            {imagePreview && (
              <div className="relative mt-4 h-30 w-30">

                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="h-30 w-30 rounded-xl object-cover"
                />
                <X
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview("");
                  }}
                  className="absolute -top-2 -right-3 cursor-pointer rounded-sm bg-gray-300"
                />
              </div>
            )}
          </div>

        </div>

        {/* Error */}
        {mutation.isError && (
          <div
            className="
              mt-5
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            "
          >
            <AlertCircle size={17} />

            <span>
              {mutation.error.message}
            </span>
          </div>
        )}

        {/* Success */}
        {mutation.isSuccess && (
          <div
            className="
              mt-5
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-emerald-200
              bg-emerald-50
              px-4
              py-3
              text-sm
              text-emerald-600
            "
          >
            <CheckCircle2 size={17} />

            <span>
              Product added successfully!
            </span>
          </div>
        )}

        {/* Submit */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isUploading || mutation.isPending}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-600/20
              transition
              hover:bg-blue-500
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading image...
              </>
            ) : mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding product...
              </>
            ) : (
              <>
                <PackagePlus className="h-4 w-4" />
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddProduct;