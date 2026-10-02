import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

/**
 * Get all users with filters and pagination (Super Admin)
 */
export const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, role, search, isActive } = req.query;

    const query = {};
    if (role) query.role = role;
    if (isActive !== undefined && isActive !== "") {
      query.isActive = isActive === "true" || isActive === true;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 20);
    const skip = (pageNum - 1) * limitNum;

    const [users, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      User.countDocuments(query)
    ]);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Users retrieved successfully",
      data: users,
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
 * Toggle user active status / block user (Super Admin)
 */
export const toggleUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    if (!isValidObjectId(userId)) {
      return sendError(res, { statusCode: 400, message: "Invalid User ID format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, { statusCode: 404, message: "User not found" });
    }

    if (isActive !== undefined) {
      user.isActive = Boolean(isActive);
    } else {
      user.isActive = !user.isActive;
    }

    await user.save();

    return sendSuccess(res, {
      statusCode: 200,
      message: `User account is now ${user.isActive ? "active" : "blocked/deactivated"}`,
      data: { user: user.toJSON() }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all restaurants for super admin (including inactive)
 */
export const getAllRestaurantsAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 20);
    const skip = (pageNum - 1) * limitNum;

    const [restaurants, total] = await Promise.all([
      Restaurant.find(query)
        .populate("owner", "name email phone")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Restaurant.countDocuments(query)
    ]);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Admin restaurants list retrieved successfully",
      data: restaurants,
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
 * Get all platform orders for super admin
 */
export const getAllOrdersAdmin = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;

    const query = {};
    if (status) query.orderStatus = status;
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 20);
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate("user", "name email phone")
        .populate("restaurant", "name city phone")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Order.countDocuments(query)
    ]);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Admin orders list retrieved successfully",
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
 * Get comprehensive administrative dashboard statistics
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      totalRestaurants,
      totalMenuItems,
      totalOrders,
      todayOrders,
      pendingOrders,
      completedOrders,
      revenueAggregation
    ] = await Promise.all([
      User.countDocuments(),
      Restaurant.countDocuments(),
      MenuItem.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.countDocuments({ orderStatus: "pending" }),
      Order.countDocuments({ orderStatus: "delivered" }),
      Order.aggregate([
        { $match: { orderStatus: "delivered" } },
        { $group: { _id: null, totalRevenue: { $sum: "$total" } } }
      ])
    ]);

    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;

    return sendSuccess(res, {
      statusCode: 200,
      message: "Dashboard statistics calculated successfully",
      data: {
        totalUsers,
        totalRestaurants,
        totalMenuItems,
        totalOrders,
        todayOrders,
        pendingOrders,
        completedOrders,
        totalRevenue: Math.round(totalRevenue * 100) / 100
      }
    });
  } catch (error) {
    next(error);
  }
};
