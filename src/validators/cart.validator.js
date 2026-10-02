import { body } from "express-validator";

export const addToCartValidator = [
  body("menuItemId")
    .notEmpty()
    .withMessage("menuItemId is required")
    .isMongoId()
    .withMessage("Invalid menuItemId format"),
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1")
];

export const updateCartItemValidator = [
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be 0 or a positive integer")
];
