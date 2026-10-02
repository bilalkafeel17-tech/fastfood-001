import Category from "../models/Category.js";
import Restaurant from "../models/Restaurant.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

/**
 * Get categories for a specific restaurant
 */
export const getCategoriesByRestaurant = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    if (!isValidObjectId(restaurantId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Restaurant ID format" });
    }

    const { isActive } = req.query;
    const filter = { restaurant: restaurantId };

    if (isActive !== undefined && isActive !== "") {
      filter.isActive = isActive === "true" || isActive === true;
    }

    const categories = await Category.find(filter).sort({ sortOrder: 1, createdAt: 1 });

    return sendSuccess(res, {
      statusCode: 200,
      message: "Categories fetched successfully",
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single category by ID
 */
export const getCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (!isValidObjectId(categoryId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Category ID format" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return sendError(res, { statusCode: 404, message: "Category not found" });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: "Category fetched successfully",
      data: category
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new category for a restaurant
 */
export const createCategory = async (req, res, next) => {
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

    const { name, description, image, sortOrder } = req.body;

    const category = await Category.create({
      restaurant: restaurantId,
      name,
      description: description || "",
      image: image || "",
      sortOrder: sortOrder || 0
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: "Category created successfully",
      data: category
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update category
 */
export const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (!isValidObjectId(categoryId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Category ID format" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return sendError(res, { statusCode: 404, message: "Category not found" });
    }

    const restaurant = await Restaurant.findById(category.restaurant);
    if (req.user.role !== "super_admin" && restaurant.owner.toString() !== req.user._id.toString()) {
      return sendError(res, { statusCode: 403, message: "Access denied." });
    }

    const { name, description, image, sortOrder, isActive } = req.body;
    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;
    if (sortOrder !== undefined) category.sortOrder = sortOrder;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();

    return sendSuccess(res, {
      statusCode: 200,
      message: "Category updated successfully",
      data: category
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete category (Soft or hard delete)
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (!isValidObjectId(categoryId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Category ID format" });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return sendError(res, { statusCode: 404, message: "Category not found" });
    }

    const restaurant = await Restaurant.findById(category.restaurant);
    if (req.user.role !== "super_admin" && restaurant.owner.toString() !== req.user._id.toString()) {
      return sendError(res, { statusCode: 403, message: "Access denied." });
    }

    await Category.findByIdAndDelete(categoryId);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Category deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
