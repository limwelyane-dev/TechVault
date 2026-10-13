require("dotenv").config();

const express = require("express");
const pool = require("./db/database");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(helmet());
app.use(express.json());
app.use("/api/upload", uploadRoutes);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "Too many request, please try again later",
  },
});

app.use("/api", apiLimiter);

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.error("Database connection failed:", error);
  } else {
    console.log("Database connected:", result.rows[0]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});