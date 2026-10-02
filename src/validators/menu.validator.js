import { body } from "express-validator";

export const createMenuItemValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Item name is required"),
  body("category")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid category ID format"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("discountPrice")
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage("Discount price must be a positive number"),
  body("description")
    .optional()
    .trim(),
  body("ingredients")
    .optional()
    .isArray()
    .withMessage("Ingredients must be an array of strings"),
  body("preparationTime")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Preparation time must be at least 1 minute"),
  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean")
];

export const updateMenuItemValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Item name cannot be empty"),
  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category ID format"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("discountPrice")
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage("Discount price must be a positive number"),
  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be a boolean")
];
