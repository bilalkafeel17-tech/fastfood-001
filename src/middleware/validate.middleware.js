import { validationResult } from "express-validator";
import { sendError } from "../utils/apiResponse.js";

/**
 * Middleware to check express-validator validation results
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg
    }));

    return sendError(res, {
      statusCode: 400,
      message: "Validation failed. Please check the provided fields.",
      errors: formattedErrors
    });
  }
  next();
};
