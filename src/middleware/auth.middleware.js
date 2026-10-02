import { verifyToken } from "../utils/jwt.js";
import User from "../models/User.js";
import { sendError } from "../utils/apiResponse.js";

/**
 * Middleware to authenticate requests using JWT Bearer token
 */
export const authenticate = async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return sendError(res, {
        statusCode: 401,
        message: "Authentication required. Please provide a valid Bearer token."
      });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return sendError(res, {
          statusCode: 401,
          message: "Token has expired. Please login again."
        });
      }
      return sendError(res, {
        statusCode: 401,
        message: "Invalid authentication token."
      });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return sendError(res, {
        statusCode: 401,
        message: "User associated with this token no longer exists."
      });
    }

    if (!user.isActive) {
      return sendError(res, {
        statusCode: 403,
        message: "Your account has been deactivated or blocked."
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
