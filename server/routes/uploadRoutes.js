const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
  uploadProductImage,
} = require("../controllers/uploadController");

const router = express.Router();

router.post(
  "/product-image",
  upload.single("image"),
  uploadProductImage
);

module.exports = router;