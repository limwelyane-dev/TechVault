const express = require("express");

const {
  getProducts,
  addProduct,
  editProduct,
  deleteProductHandler,
  getAllProductsForAdminHandler,
  restoreProductHandler,
} = require("../controllers/productController");

const authenticate = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const validate = require("../middleware/validate");
const { productSchema } = require("../validation/productSchema");

const router = express.Router();

router.get("/", getProducts);

router.get(
  "/admin/all",
  authenticate,
  adminOnly,
  getAllProductsForAdminHandler
);

router.post(
  "/",
  authenticate,
  adminOnly,
  validate(productSchema),
  addProduct
);

router.patch(
  "/:id/restore",
  authenticate,
  adminOnly,
  restoreProductHandler
);

router.put(
  "/:id",
  authenticate,
  adminOnly,
  validate(productSchema),
  editProduct
);

router.delete(
  "/:id",
  authenticate,
  adminOnly,
  deleteProductHandler
);

module.exports = router;