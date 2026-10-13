
const pool = require("../db/database");

const createReview = async ({
  userId,
  productId,
  orderId,
  rating,
  comment,
}) => {
  // Confirm the customer owns the order,
  // the order is delivered, and it contains this product.
  const eligibility = await pool.query(
    `SELECT o.id
     FROM orders o
     JOIN order_items oi ON oi.order_id = o.id
     WHERE o.id = $1
       AND o.user_id = $2
       AND o.status = 'delivered'
       AND oi.product_id = $3
     LIMIT 1`,
    [orderId, userId, productId]
  );

  if (eligibility.rowCount === 0) {
    const error = new Error(
      "You can review this product only after your order is delivered."
    );
    error.statusCode = 403;
    throw error;
  }

  const result = await pool.query(
    `INSERT INTO reviews
       (user_id, product_id, order_id, rating, comment)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, productId, orderId, rating, comment || null]
  );

  return result.rows[0];
};

const getProductReviews = async (productId) => {
  const result = await pool.query(
    `SELECT
       r.id,
       r.rating,
       r.comment,
       r.created_at,
       u.name AS customer_name
     FROM reviews r
     JOIN users u ON u.id = r.user_id
     WHERE r.product_id = $1
     ORDER BY r.created_at DESC`,
    [productId]
  );

  return result.rows;
};

const getProductRatingSummary = async (productId) => {
  const result = await pool.query(
    `SELECT
       ROUND(AVG(rating), 1) AS average_rating,
       COUNT(*)::INTEGER AS review_count
     FROM reviews
     WHERE product_id = $1`,
    [productId]
  );

  return result.rows[0];
};

module.exports = {
  createReview,
  getProductReviews,
  getProductRatingSummary,
};
