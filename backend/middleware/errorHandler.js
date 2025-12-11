// backend/middleware/errorHandler.js

// 404 handler – for unknown routes
function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

// Central error handler
function errorHandler(err, req, res, next) {
  console.error("ERROR:", err);

  // If status code is still 200, that means someone forgot to set it
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Server error",
    // in real production, you'd hide the stack:
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
