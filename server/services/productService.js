const pool = require("../db/database");


const getAllProducts = async () => {
  const result = await pool.query(`
    SELECT
      p.*,
      COALESCE(ROUND(AVG(r.rating), 1), 0) AS average_rating,
      COUNT(r.id)::INTEGER AS review_count
    FROM products p
    LEFT JOIN reviews r
      ON r.product_id = p.id
    WHERE p.is_active = true
    GROUP BY p.id
    ORDER BY p.id DESC
  `);

  return result.rows;
};


const getAllProductsForAdmin = async () => {
  const result = await pool.query(
    `SELECT *
    FROM products
    ORDER By id DESC`
  );

  return result.rows;
};

const createProduct = async (name, price, category, image_url) => {
  console.log("IMAGE URL:", image_url);

  const result = await pool.query(
    `INSERT INTO products (name, price, category, image_url)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [name, price, category, image_url]
  );

  console.log("CREATED PRODUCT:", result.rows[0]);

  return result.rows[0];
};

const updateProduct = async (id, name, price, category) => {
  const result = await pool.query(
    `UPDATE products
    SET name = $1, price = $2, category = $3
    WHERE id = $4
    RETURNING *`,
    [name, price, category, id]
  );

  return result.rows[0];
}

const deleteProduct = async (id) => {
  const result = await pool.query(
    `UPDATE products
     SET is_active = false
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

const restoreProduct = async (id) => {
  const result = await pool.query(
    `UPDATE products
     SET is_active = true
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllProducts,
  getAllProductsForAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
};