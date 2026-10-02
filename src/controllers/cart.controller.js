import { cartService } from "../services/cart.service.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

/**
 * Get authenticated user's cart
 */
export const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getUserCart(req.user._id);
    return sendSuccess(res, {
      statusCode: 200,
      message: "Cart retrieved successfully",
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add item to cart
 */
export const addItem = async (req, res, next) => {
  try {
    const { menuItemId, quantity = 1 } = req.body;
    if (!isValidObjectId(menuItemId)) {
      return sendError(res, { statusCode: 400, message: "Invalid menuItemId format" });
    }

    const cart = await cartService.addItem(req.user._id, menuItemId, quantity);
    return sendSuccess(res, {
      statusCode: 200,
      message: "Item added to cart successfully",
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update quantity of item in cart
 */
export const updateItemQuantity = async (req, res, next) => {
  try {
    const { menuItemId } = req.params;
    const { quantity } = req.body;

    if (!isValidObjectId(menuItemId)) {
      return sendError(res, { statusCode: 400, message: "Invalid menuItemId format" });
    }

    if (quantity === undefined || quantity === null) {
      return sendError(res, { statusCode: 400, message: "Quantity is required" });
    }

    const cart = await cartService.updateItemQuantity(req.user._id, menuItemId, quantity);
    return sendSuccess(res, {
      statusCode: 200,
      message: "Cart item updated successfully",
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Remove an item from cart
 */
export const removeItem = async (req, res, next) => {
  try {
    const { menuItemId } = req.params;
    if (!isValidObjectId(menuItemId)) {
      return sendError(res, { statusCode: 400, message: "Invalid menuItemId format" });
    }

    const cart = await cartService.removeItem(req.user._id, menuItemId);
    return sendSuccess(res, {
      statusCode: 200,
      message: "Item removed from cart successfully",
      data: cart
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Clear entire cart
 */
export const clearCart = async (req, res, next) => {
  try {
    const cart = await cartService.clearCart(req.user._id);
    return sendSuccess(res, {
      statusCode: 200,
      message: "Cart cleared successfully",
      data: cart
    });
  } catch (error) {
    next(error);
  }
};
