const express = require("express");

const {
  addOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrdersHandler,
  updateOrderStatusHandler,
  getRecentOrdersHandler,
  deleteMyOrder,
} = require("../controllers/orderController");

const adminOnly = require("../middleware/adminMiddleware");
const authenticate = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { orderSchema } = require("../validation/orderSchema");

const router = express.Router();

router.post(
  "/",
  authenticate,
  validate(orderSchema),
  addOrder
);

router.get(
  "/my-orders",
  authenticate,
  getMyOrders
);

router.get(
  "/admin/all",
  authenticate,
  adminOnly,
  getAllOrdersHandler
);

router.get(
  "/admin/recent",
  authenticate,
  adminOnly,
  getRecentOrdersHandler
);

router.patch(
  "/admin/:id/status",
  authenticate,
  adminOnly,
  updateOrderStatusHandler
);

router.get(
  "/:id",
  authenticate,
  getSingleOrder
);

router.delete(
  "/:id",
  authenticate,
  deleteMyOrder
);

module.exports = router;