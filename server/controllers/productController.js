const { 
  getAllProducts,
  getAllProductsForAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
} = require("../services/productService");

const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getAllProductsForAdminHandler = async (req, res, next) => {
  try {
    const products = await getAllProductsForAdmin();

    res.json(products);
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try{
    console.log("REQ BODY:", req.body);
    const { name, price, category, image_url } = req.body;

    console.log("IMAGE URL FROM BODY:", image_url);

    const product = await createProduct(name, price, category, image_url);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

const editProduct = async (req, res, next) => {
  try{
    const { id } = req.params;
    const { name, price, category} = req.body;

    const product = await updateProduct(id, name, price, category);

    if(!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProductHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await deleteProduct(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

const restoreProductHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await restoreProduct(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product restored successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getAllProductsForAdminHandler,
  addProduct,
  editProduct,
  deleteProductHandler,
  restoreProductHandler,
};