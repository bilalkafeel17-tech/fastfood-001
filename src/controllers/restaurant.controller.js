import Restaurant from "../models/Restaurant.js";
import { restaurantService } from "../services/restaurant.service.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

/**
 * List restaurants with search, filters & pagination
 */
export const getAllRestaurants = async (req, res, next) => {
  try {
    const result = await restaurantService.getRestaurants(req.query);
    return sendSuccess(res, {
      statusCode: 200,
      message: "Restaurants retrieved successfully",
      data: result.restaurants,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get restaurant by ID (includes categories and menu items)
 */
export const getRestaurantById = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    if (!isValidObjectId(restaurantId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Restaurant ID format" });
    }

    const result = await restaurantService.getRestaurantDetails(restaurantId);
    return sendSuccess(res, {
      statusCode: 200,
      message: "Restaurant details fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new restaurant (restaurant_admin or super_admin)
 */
export const createRestaurant = async (req, res, next) => {
  try {
    const {
      name,
      description,
      phone,
      email,
      address,
      city,
      image,
      openingTime,
      closingTime,
      deliveryFee,
      minOrder,
      cuisine,
      owner
    } = req.body;

    // Determine owner: super_admin can assign, otherwise current user
    let assignedOwner = req.user._id;
    if (req.user.role === "super_admin" && owner && isValidObjectId(owner)) {
      assignedOwner = owner;
    }

    const restaurant = await Restaurant.create({
      name,
      description: description || "",
      owner: assignedOwner,
      phone: phone || "",
      email: email || "",
      address,
      city,
      image: image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80",
      openingTime: openingTime || "09:00",
      closingTime: closingTime || "23:00",
      deliveryFee: deliveryFee !== undefined ? deliveryFee : 150,
      minOrder: minOrder !== undefined ? minOrder : 0,
      cuisine: cuisine || ["Fast Food"]
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: "Restaurant created successfully",
      data: { restaurant }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update restaurant details (Owner or super_admin)
 */
export const updateRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    if (!isValidObjectId(restaurantId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Restaurant ID format" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return sendError(res, { statusCode: 404, message: "Restaurant not found" });
    }

    // Authorization: Owner or Super Admin
    if (req.user.role !== "super_admin" && restaurant.owner.toString() !== req.user._id.toString()) {
      return sendError(res, { statusCode: 403, message: "Access denied. You do not own this restaurant." });
    }

    const allowedFields = [
      "name",
      "description",
      "phone",
      "email",
      "address",
      "city",
      "image",
      "openingTime",
      "closingTime",
      "isOpen",
      "isActive",
      "deliveryFee",
      "minOrder",
      "cuisine"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        restaurant[field] = req.body[field];
      }
    });

    await restaurant.save();

    return sendSuccess(res, {
      statusCode: 200,
      message: "Restaurant updated successfully",
      data: { restaurant }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete (Soft deactivate) restaurant
 */
export const deleteRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    if (!isValidObjectId(restaurantId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Restaurant ID format" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return sendError(res, { statusCode: 404, message: "Restaurant not found" });
    }

    // Super admin or Owner
    if (req.user.role !== "super_admin" && restaurant.owner.toString() !== req.user._id.toString()) {
      return sendError(res, { statusCode: 403, message: "Access denied." });
    }

    // Soft delete
    restaurant.isActive = false;
    restaurant.isOpen = false;
    await restaurant.save();

    return sendSuccess(res, {
      statusCode: 200,
      message: "Restaurant deactivated successfully"
    });
  } catch (error) {
    next(error);
  }
};
