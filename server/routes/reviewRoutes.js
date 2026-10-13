
const express = require("express");
const router = express.Router();

const {
  submitReview,
  getReviews,
} = require("../controllers/reviewController");

const authMiddleware = require("../middleware/authMiddleware");

// Public: read product reviews.
router.get("/product/:productId", getReviews);

// Protected: submit a review.
router.post("/", authMiddleware, submitReview);

module.exports = router;
