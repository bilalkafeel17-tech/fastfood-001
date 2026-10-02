import { authService } from "../services/auth.service.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const result = await authService.registerUser({
      name,
      email,
      password,
      phone,
      role
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: "Registration successful. Welcome to CraveBite!",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });

    return sendSuccess(res, {
      statusCode: 200,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  return sendSuccess(res, {
    statusCode: 200,
    message: "Logged out successfully"
  });
};
