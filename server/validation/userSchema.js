const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(150, "Email must not exceed 150 characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),
});

module.exports = {
  registerSchema,
};