import { body } from "express-validator";

export const createCategoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),
  body("description")
    .optional()
    .trim(),
  body("sortOrder")
    .optional()
    .isInt()
    .withMessage("Sort order must be an integer"),
  body("image")
    .optional()
    .trim()
];

export const updateCategoryValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category name cannot be empty"),
  body("description")
    .optional()
    .trim(),
  body("sortOrder")
    .optional()
    .isInt()
    .withMessage("Sort order must be an integer"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean")
];
