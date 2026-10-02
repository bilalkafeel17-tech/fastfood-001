import { sendError } from "../utils/apiResponse.js";
import Restaurant from "../models/Restaurant.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

/**
 * Middleware to authorize requests based on user roles
 * Example: authorize("restaurant_admin", "super_admin")
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, {
        statusCode: 401,
        message: "Unauthorized. Please authenticate first."
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(res, {
        statusCode: 403,
        message: `Forbidden. Role '${req.user.role}' does not have access to this resource.`
      });
    }

    next();
  };
};

/**
 * Middleware to ensure the authenticated restaurant_admin owns the specified restaurant,
 * or allows super_admin unconditionally.
 */
export const checkRestaurantOwnership = async (req, res, next) => {
  try {
    const restaurantId = req.params.restaurantId || req.body.restaurant;

    if (!restaurantId) {
      return sendError(res, {
        statusCode: 400,
        message: "Restaurant ID is required."
      });
    }

    if (!isValidObjectId(restaurantId)) {
      return sendError(res, {
        statusCode: 400,
        message: "Invalid Restaurant ID format."
      });
    }

    // Super admin has universal access
    if (req.user.role === "super_admin") {
      return next();
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return sendError(res, {
        statusCode: 404,
        message: "Restaurant not found."
      });
    }

    // Check ownership
    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return sendError(res, {
        statusCode: 403,
        message: "Access denied. You do not own this restaurant."
      });
    }

    req.restaurant = restaurant;
    next();
  } catch (error) {
    next(error);
  }
};
