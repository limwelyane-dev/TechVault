
const pool = require("../db/database");

const createOrder = async (userId, items) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const products = [];

    for (const item of items) {
      const result = await client.query(
        `SELECT id, price
         FROM products
         WHERE id = $1`,
        [item.productId]
      );

      if (result.rows.length === 0) {
        throw new Error(
          `Product ${item.productId} does not exist`
        );
      }

      products.push(result.rows[0]);
    }

    const orderResult = await client.query(
      `INSERT INTO orders (user_id)
       VALUES ($1)
       RETURNING *`,
      [userId]
    );

    const order = orderResult.rows[0];

    for (const item of items) {
      const product = products.find(
        (product) => product.id === item.productId
      );

      await client.query(
        `INSERT INTO order_items
         (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [
          order.id,
          item.productId,
          item.quantity,
          product.price,
        ]
      );
    }

    await client.query("COMMIT");

    return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getOrdersByUser = async (userId) => {
  const result = await pool.query(
    `SELECT
        orders.id AS order_id,
        orders.created_at,
        orders.status,
        order_items.product_id,
        products.name AS product_name,
        order_items.price,
        order_items.quantity,
        order_items.price * order_items.quantity AS subtotal,
        EXISTS (
          SELECT 1
          FROM reviews
          WHERE reviews.user_id = orders.user_id
            AND reviews.product_id = order_items.product_id
            AND reviews.order_id = orders.id
        ) AS has_reviewed
     FROM orders
     JOIN order_items
        ON orders.id = order_items.order_id
     JOIN products
        ON order_items.product_id = products.id
     WHERE orders.user_id = $1
     ORDER BY orders.created_at DESC`,
    [userId]
  );

  return result.rows;
};

const getOrderById = async (orderId, userId) => {
  const result = await pool.query(
    `SELECT
        orders.id AS order_id,
        orders.created_at,
        products.id AS product_id,
        products.name AS product_name,
        order_items.price,
        order_items.quantity,
        order_items.price * order_items.quantity AS subtotal
     FROM orders
     JOIN order_items
       ON orders.id = order_items.order_id
     JOIN products
       ON order_items.product_id = products.id
     WHERE orders.id = $1
       AND orders.user_id = $2`,
    [orderId, userId]
  );

  return result.rows;
};

const getAllOrders = async () => {
  const result = await pool.query(
    `SELECT
        orders.id AS order_id,
        orders.created_at,
        orders.status,
        users.id AS user_id,
        users.name AS customer_name,
        users.email AS customer_email,
        order_items.product_id,
        products.name AS product_name,
        order_items.quantity,
        order_items.price,
        order_items.price * order_items.quantity AS subtotal
     FROM orders
     JOIN users
       ON orders.user_id = users.id
     JOIN order_items
       ON orders.id = order_items.order_id
     JOIN products
       ON order_items.product_id = products.id
     ORDER BY orders.created_at DESC`
  );

  return result.rows;
};

const updateOrderStatus = async (orderId, status) => {
  const result = await pool.query(
    `UPDATE orders
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, orderId]
  );

  return result.rows[0];
};

const getOrderByIdForAdmin = async (orderId) => {
  const result = await pool.query(
    `SELECT id, status
     FROM orders
     WHERE id = $1`,
    [orderId]
  );

  return result.rows[0];
};

const getRecentOrders = async () => {
  const result = await pool.query(`
    SELECT
      orders.id AS order_id,
      orders.created_at,
      orders.status,
      users.name AS customer_name,
      COALESCE(
        SUM(order_items.price * order_items.quantity),
        0
      ) AS total
    FROM orders
    JOIN users
      ON orders.user_id = users.id
    JOIN order_items
      ON orders.id = order_items.order_id
    GROUP BY
      orders.id,
      orders.created_at,
      orders.status,
      users.name
    ORDER BY orders.created_at DESC
    LIMIT 5
  `);

  return result.rows;
};

const deleteOrder = async (orderId, userId) => {
  const result = await pool.query(
    `DELETE FROM orders
     WHERE id = $1
       AND user_id = $2
       AND status IN ('delivered', 'cancelled')
     RETURNING *`,
    [orderId, userId]
  );

  return result.rows[0];
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getOrderByIdForAdmin,
  getRecentOrders,
  deleteOrder,
};