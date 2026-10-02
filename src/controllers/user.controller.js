import User from "../models/User.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

/**
 * Get current authenticated user profile
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return sendSuccess(res, {
      statusCode: 200,
      message: "User profile retrieved successfully",
      data: { user: user.toJSON() }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 */
export const updateMe = async (req, res, next) => {
  try {
    const allowedUpdates = ["name", "phone", "address", "city", "avatar"];
    const updates = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      returnDocument: "after",
      runValidators: true
    });

    return sendSuccess(res, {
      statusCode: 200,
      message: "Profile updated successfully",
      data: { user: user.toJSON() }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Change current user password
 */
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return sendError(res, { statusCode: 404, message: "User not found" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return sendError(res, {
        statusCode: 400,
        message: "Incorrect current password"
      });
    }

    user.password = newPassword;
    await user.save();

    return sendSuccess(res, {
      statusCode: 200,
      message: "Password changed successfully"
    });
  } catch (error) {
    next(error);
  }
};
