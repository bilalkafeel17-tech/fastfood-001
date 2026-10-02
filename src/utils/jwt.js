import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

/**
 * Generate a JWT token for a given payload (user ID, role, etc.)
 */
export const signToken = (payload) => {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN
  });
};

/**
 * Verify and decode a JWT token
 */
export const verifyToken = (token) => {
  return jwt.verify(token, ENV.JWT_SECRET);
};
