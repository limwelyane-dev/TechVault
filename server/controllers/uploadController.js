const cloudinary = require("../config/cloudinary");

const uploadProductImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded.",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "techvault/products",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });

    res.status(200).json({
      message: "Image uploaded successfully.",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadProductImage,
};