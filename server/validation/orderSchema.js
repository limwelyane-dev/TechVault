const { z } = require("zod");

const orderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z
          .number()
          .int()
          .positive(),

        quantity: z
          .number()
          .int()
          .positive(),
      })
    )
    .min(1, "Order must contain at least one item"),
});

module.exports = {
  orderSchema,
};