const express = require("express");

const {
  getStats,
} = require("../controllers/dashboardController");

const authenticate = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/stats",
  authenticate,
  adminOnly,
  getStats
);

module.exports = router;