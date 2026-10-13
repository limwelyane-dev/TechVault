const pool = require("../db/database");

const getDashboardStats = async () => {
  const result = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM products) AS total_products,

      (SELECT COUNT(*)
       FROM products
       WHERE is_active = true) AS active_products,

      (SELECT COUNT(*) FROM orders) AS total_orders,

      (SELECT COUNT(*)
       FROM orders
       WHERE status = 'pending') AS pending_orders,

      (SELECT COUNT(*) FROM users) AS total_customers,

      (SELECT COALESCE(SUM(price * quantity), 0)
       FROM order_items) AS total_revenue
  `);

  return result.rows[0];
};

module.exports = {
  getDashboardStats,
};