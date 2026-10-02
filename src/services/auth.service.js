import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";

export const authService = {
  /**
   * Register a new user
   */
  registerUser: async ({ name, email, password, phone, role }) => {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      const error = new Error("An account with this email already exists");
      error.statusCode = 409;
      throw error;
    }

    // Default role is customer unless super_admin creates explicitly
    const userRole = role && ["customer", "restaurant_admin"].includes(role) ? role : "customer";

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || "",
      role: userRole
    });

    const token = signToken({ id: user._id, role: user.role });

    return {
      user: user.toJSON(),
      accessToken: token
    };
  },

  /**
   * Login user with credentials
   */
  loginUser: async ({ email, password }) => {
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    if (!user.isActive) {
      const error = new Error("Your account has been deactivated. Please contact support.");
      error.statusCode = 403;
      throw error;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const token = signToken({ id: user._id, role: user.role });

    return {
      user: user.toJSON(),
      accessToken: token
    };
  }
};
