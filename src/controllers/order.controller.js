import Order from "../models/Order.js";
import Restaurant from "../models/Restaurant.js";
import { orderService } from "../services/order.service.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

/**
 * Place a new order from current cart
 */
export const createOrder = async (req, res, next) => {
  try {
    const { deliveryAddress, phone, paymentMethod, notes } = req.body;
    const order = await orderService.createOrderFromCart(req.user._id, {
      deliveryAddress,
      phone,
      paymentMethod,
      notes
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: "Order placed successfully",
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current customer's orders (with pagination and status filtering)
 */
export const getMyOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { user: req.user._id };
    if (status) {
      query.orderStatus = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate("restaurant", "name phone address city image")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Order.countDocuments(query)
    ]);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Customer orders fetched successfully",
      data: orders,
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
 * Get order by ID
 */
export const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!isValidObjectId(orderId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Order ID format" });
    }

    const order = await Order.findById(orderId)
      .populate("restaurant", "name address phone image city owner")
      .populate("user", "name email phone")
      .populate("statusHistory.updatedBy", "name role");

    if (!order) {
      return sendError(res, { statusCode: 404, message: "Order not found" });
    }

    // Role check: Customer can only view own order, Restaurant admin can view if they own restaurant, Super Admin can view all
    const isOwnerCustomer = req.user.role === "customer" && order.user._id.toString() === req.user._id.toString();
    const isRestaurantAdmin =
      req.user.role === "restaurant_admin" &&
      order.restaurant.owner &&
      order.restaurant.owner.toString() === req.user._id.toString();
    const isSuperAdmin = req.user.role === "super_admin";

    if (!isOwnerCustomer && !isRestaurantAdmin && !isSuperAdmin) {
      return sendError(res, { statusCode: 403, message: "Access denied. You cannot view this order." });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: "Order details fetched successfully",
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel an order
 */
export const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;

    if (!isValidObjectId(orderId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Order ID format" });
    }

    const order = await orderService.cancelOrder(orderId, req.user, reason);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Order cancelled successfully",
      data: order
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update order status (Restaurant Admin or Super Admin)
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status, comment } = req.body;

    if (!isValidObjectId(orderId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Order ID format" });
    }

    const order = await Order.findById(orderId).populate("restaurant");
    if (!order) {
      return sendError(res, { statusCode: 404, message: "Order not found" });
    }

    // Check ownership for restaurant_admin
    if (
      req.user.role === "restaurant_admin" &&
      order.restaurant.owner.toString() !== req.user._id.toString()
    ) {
      return sendError(res, {
        statusCode: 403,
        message: "Access denied. You do not own the restaurant for this order."
      });
    }

    const updatedOrder = await orderService.updateStatus(orderId, status, req.user._id, comment);

    return sendSuccess(res, {
      statusCode: 200,
      message: `Order status updated to '${status}' successfully`,
      data: updatedOrder
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get orders for a specific restaurant (Restaurant Admin / Super Admin)
 */
export const getRestaurantOrders = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    if (!isValidObjectId(restaurantId)) {
      return sendError(res, { statusCode: 400, message: "Invalid Restaurant ID format" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return sendError(res, { statusCode: 404, message: "Restaurant not found" });
    }

    if (
      req.user.role !== "super_admin" &&
      restaurant.owner.toString() !== req.user._id.toString()
    ) {
      return sendError(res, {
        statusCode: 403,
        message: "Access denied. You do not own this restaurant."
      });
    }

    const { page = 1, limit = 20, status, search, startDate, endDate } = req.query;

    const query = { restaurant: restaurantId };

    if (status) {
      query.orderStatus = status;
    }

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 20);
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate("user", "name email phone")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Order.countDocuments(query)
    ]);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Restaurant orders fetched successfully",
      data: orders,
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
