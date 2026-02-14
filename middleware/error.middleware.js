const errorMiddleware = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err.stack);

  if (err.name === "CastError") {
    error = new Error("Resource not found");
    error.statusCode = 404;
  }

  if (err.code === 11000) {
    error = new Error("Duplicate key value entered");
    error.statusCode = 400;
  }

  if (err.name === "ValidationError") {
    error = new Error(
      Object.values(err.errors)
        .map((val) => val.message)
        .join(", "),
    );
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};

export default errorMiddleware;
