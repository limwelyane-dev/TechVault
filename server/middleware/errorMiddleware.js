const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // PostgreSQL unique constraint violation
  if (err.code === "23505") {
    return res.status(409).json({
      message: "A record with this value already exists",
    });
  }

  // PostgreSQL foreign key violation
  if (err.code === "23503") {
    return res.status(400).json({
      message: "Referenced record does not exist",
    });
  }

  // PostgreSQL not-null violation
  if (err.code === "23502") {
    return res.status(400).json({
      message: "Required database field is missing",
    });
  }

  // Default error
  res.status(500).json({
    message: "Internal server error",
  });
};

module.exports = errorMiddleware;