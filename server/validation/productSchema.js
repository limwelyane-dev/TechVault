const { z } = require("zod");

const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(100, "Product name must not exceed 100 characters"),

  price: z
    .number({
      error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),

  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .max(50, "Category must not exceed 50 characters"),

  image_url: z
    .string()
    .url("Image URL must be a valid URL")
    .optional()
    .or(z.literal("")),
});

module.exports = {
  productSchema,
};