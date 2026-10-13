const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      message: "Product name is required",
    });
  }

  if (
    price === undefined || 
    price === null || 
    typeof price !== "number" ||
    Number.isNaN(price) ||
    price <= 0
  ) {
    return res.status(400).json({
      message: "Price must be a number greater than 0",
    });
  }

  next();
};

module.exports = validateProduct;