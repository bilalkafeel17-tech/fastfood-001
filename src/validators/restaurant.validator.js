import { body } from "express-validator";

export const createRestaurantValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Restaurant name is required"),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),
  body("phone")
    .optional()
    .trim(),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("description")
    .optional()
    .trim(),
  body("openingTime")
    .optional()
    .trim(),
  body("closingTime")
    .optional()
    .trim(),
  body("deliveryFee")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Delivery fee must be a positive number"),
  body("minOrder")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum order must be a positive number")
];

export const updateRestaurantValidator = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Restaurant name cannot be empty"),
  body("address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Address cannot be empty"),
  body("city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("City cannot be empty"),
  body("phone")
    .optional()
    .trim(),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("deliveryFee")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Delivery fee must be a positive number"),
  body("minOrder")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum order must be a positive number")
];
