
const {
  createReview,
  getProductReviews,
  getProductRatingSummary,
} = require("../services/reviewService");

const submitReview = async (req, res, next) => {
  try {
    const { product_id, order_id, rating, comment } = req.body;

    console.log("Review request body:", req.body);
    console.log("Value types:", {
      product_id: typeof product_id,
      order_id: typeof order_id,
      rating: typeof rating,
    });

    if (
      !Number.isInteger(product_id) ||
      !Number.isInteger(order_id) ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        message: "Product, order, and a rating from 1 to 5 are required.",
      });
    }

    if (
      comment !== undefined &&
      comment !== null &&
      (typeof comment !== "string" || comment.length > 1000)
    ) {
      return res.status(400).json({
        message: "Comment must be 1000 characters or fewer.",
      });
    }

    // Assumes your authentication middleware sets req.user.id.
    const userId = req.user.id;

    const review = await createReview({
      userId,
      productId: product_id,
      orderId: order_id,
      rating,
      comment: comment?.trim() || null,
    });

    res.status(201).json({
      message: "Review submitted successfully.",
      review,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "You have already reviewed this product for this order.",
      });
    }

    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);

    if (!Number.isInteger(productId) || productId < 1) {
      return res.status(400).json({
        message: "Invalid product ID.",
      });
    }

    const [reviews, summary] = await Promise.all([
      getProductReviews(productId),
      getProductRatingSummary(productId),
    ]);

    res.json({ reviews, summary });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitReview,
  getReviews,
};
