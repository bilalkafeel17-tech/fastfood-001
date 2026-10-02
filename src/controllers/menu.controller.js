import MenuItem from "../models/MenuItem.js";
import Restaurant from "../models/Restaurant.js";
import Category from "../models/Category.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

/**
 * Get menu items for a restaurant with filtering, search, and pagination
 */
export const getMenuItemsByRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    if (!isValidObjectId(restaurantId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Restaurant ID format" });
    }

    const {
      category,
      search,
      minPrice,
      maxPrice,
      isAvailable,
      page = 1,
      limit = 20
    } = req.query;

    const query = { restaurant: restaurantId };

    if (category) {
      if (isValidObjectId(category)) {
        query.category = category;
      }
    }

    if (isAvailable !== undefined && isAvailable !== "") {
      query.isAvailable = isAvailable === "true" || isAvailable === true;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined && minPrice !== "") query.price.$gte = parseFloat(minPrice);
      if (maxPrice !== undefined && maxPrice !== "") query.price.$lte = parseFloat(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 20);
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      MenuItem.find(query)
        .populate("category", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      MenuItem.countDocuments(query)
    ]);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Menu items fetched successfully",
      data: items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum) || 1
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single menu item by ID
 */
export const getMenuItemById = async (req, res, next) => {
  try {
    const { menuItemId } = req.params;
    if (!isValidObjectId(menuItemId)) {
      return sendError(res, { statusCode: 400, message: "Invalid MenuItem ID format" });
    }

    const item = await MenuItem.findById(menuItemId)
      .populate("category", "name")
      .populate("restaurant", "name phone address");

    if (!item) {
      return sendError(res, { statusCode: 404, message: "Menu item not found" });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: "Menu item fetched successfully",
      data: item
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new menu item for a restaurant
 */
export const createMenuItem = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    if (!isValidObjectId(restaurantId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Restaurant ID format" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return sendError(res, { statusCode: 404, message: "Restaurant not found" });
    }

    // Check ownership
    if (req.user.role !== "super_admin" && restaurant.owner.toString() !== req.user._id.toString()) {
      return sendError(res, { statusCode: 403, message: "Access denied. You do not own this restaurant." });
    }

    const {
      name,
      category,
      price,
      discountPrice,
      description,
      image,
      ingredients,
      isAvailable,
      preparationTime
    } = req.body;

    // Validate category belongs to restaurant
    const categoryDoc = await Category.findOne({ _id: category, restaurant: restaurantId });
    if (!categoryDoc) {
      return sendError(res, {
        statusCode: 400,
        message: "Category not found or does not belong to this restaurant."
      });
    }

    const item = await MenuItem.create({
      restaurant: restaurantId,
      category,
      name,
      price,
      discountPrice: discountPrice !== undefined ? discountPrice : null,
      description: description || "",
      image: image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
      ingredients: ingredients || [],
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      preparationTime: preparationTime || 15
    });

    const populated = await MenuItem.findById(item._id).populate("category", "name");

    return sendSuccess(res, {
      statusCode: 201,
      message: "Menu item created successfully",
      data: populated
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update menu item
 */
export const updateMenuItem = async (req, res, next) => {
  try {
    const { menuItemId } = req.params;
    if (!isValidObjectId(menuItemId)) {
      return sendError(res, { statusCode: 400, message: "Invalid MenuItem ID format" });
    }

    const item = await MenuItem.findById(menuItemId);
    if (!item) {
      return sendError(res, { statusCode: 404, message: "Menu item not found" });
    }

    const restaurant = await Restaurant.findById(item.restaurant);
    if (req.user.role !== "super_admin" && restaurant.owner.toString() !== req.user._id.toString()) {
      return sendError(res, { statusCode: 403, message: "Access denied." });
    }

    const allowedFields = [
      "name",
      "category",
      "price",
      "discountPrice",
      "description",
      "image",
      "ingredients",
      "isAvailable",
      "preparationTime",
      "isFeatured"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        item[field] = req.body[field];
      }
    });

    await item.save();
    const updated = await MenuItem.findById(item._id).populate("category", "name");

    return sendSuccess(res, {
      statusCode: 200,
      message: "Menu item updated successfully",
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete menu item
 */
export const deleteMenuItem = async (req, res, next) => {
  try {
    const { menuItemId } = req.params;
    if (!isValidObjectId(menuItemId)) {
      return sendError(res, { statusCode: 400, message: "Invalid MenuItem ID format" });
    }

    const item = await MenuItem.findById(menuItemId);
    if (!item) {
      return sendError(res, { statusCode: 404, message: "Menu item not found" });
    }

    const restaurant = await Restaurant.findById(item.restaurant);
    if (req.user.role !== "super_admin" && restaurant.owner.toString() !== req.user._id.toString()) {
      return sendError(res, { statusCode: 403, message: "Access denied." });
    }

    await MenuItem.findByIdAndDelete(menuItemId);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Menu item deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle menu item availability
 */
export const toggleAvailability = async (req, res, next) => {
  try {
    const { menuItemId } = req.params;
    if (!isValidObjectId(menuItemId)) {
      return sendError(res, { statusCode: 400, message: "Invalid MenuItem ID format" });
    }

    const item = await MenuItem.findById(menuItemId);
    if (!item) {
      return sendError(res, { statusCode: 404, message: "Menu item not found" });
    }

    const restaurant = await Restaurant.findById(item.restaurant);
    if (req.user.role !== "super_admin" && restaurant.owner.toString() !== req.user._id.toString()) {
      return sendError(res, { statusCode: 403, message: "Access denied." });
    }

    if (req.body.isAvailable !== undefined) {
      item.isAvailable = req.body.isAvailable;
    } else {
      item.isAvailable = !item.isAvailable;
    }

    await item.save();

    return sendSuccess(res, {
      statusCode: 200,
      message: `Menu item is now ${item.isAvailable ? "available" : "unavailable"}`,
      data: item
    });
  } catch (error) {
    next(error);
  }
};
