import { body } from "express-validator";
import { ORDER_STATUSES, PAYMENT_METHODS } from "../models/Order.js";

export const createOrderValidator = [
  body("deliveryAddress")
    .notEmpty()
    .withMessage("Delivery address is required"),
  body("deliveryAddress.address")
    .trim()
    .notEmpty()
    .withMessage("Street address is required"),
  body("deliveryAddress.city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Contact phone number is required"),
  body("paymentMethod")
    .optional()
    .isIn(PAYMENT_METHODS)
    .withMessage(`Payment method must be one of: ${PAYMENT_METHODS.join(", ")}`),
  body("notes")
    .optional()
    .trim()
];

export const updateOrderStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Order status is required")
    .isIn(ORDER_STATUSES)
    .withMessage(`Status must be one of: ${ORDER_STATUSES.join(", ")}`),
  body("comment")
    .optional()
    .trim()
];
