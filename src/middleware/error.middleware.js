import { sendError } from "../utils/apiResponse.js";

/**
 * 404 Not Found Middleware
 */
export const notFound = (req, res) => {
  return sendError(res, {
    statusCode: 404,
    message: `Endpoint not found: [${req.method}] ${req.originalUrl}`
  });
};

/**
 * Global Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = [];

  // Mongoose Bad ObjectId (CastError)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ID format for field '${err.path}'`;
  }

  // Mongoose Duplicate Key Error (Code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `A record with this ${field} already exists.`;
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Database validation failed.";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message
    }));
  }

  // JWT Token Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please authenticate again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired. Please login again.";
  }

  return sendError(res, {
    statusCode,
    message,
    errors
  });
};
