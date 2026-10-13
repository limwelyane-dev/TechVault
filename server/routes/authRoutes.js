const express = require("express");

const {
  register,
  login,
} = require("../controllers/authController");

const authenticate = require("../middleware/authMiddleware");

const validate = require("../middleware/validate");
const {
  registerSchema,
} = require("../validation/userSchema");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post("/login", login);

router.get(
  "/profile",
  authenticate,
  (req, res) => {
    res.json({
      message: "You can access this protected route",
      user: req.user,
    });
  }
);

module.exports = router;