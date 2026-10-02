import { Router } from "express";
import * as restaurantController from "../controllers/restaurant.controller.js";
import * as categoryController from "../controllers/category.controller.js";
import * as menuController from "../controllers/menu.controller.js";
import * as orderController from "../controllers/order.controller.js";
import * as reviewController from "../controllers/review.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  createRestaurantValidator,
  updateRestaurantValidator
} from "../validators/restaurant.validator.js";
import { createCategoryValidator } from "../validators/category.validator.js";
import { createMenuItemValidator } from "../validators/menu.validator.js";

const router = Router();

// Public Restaurant APIs
router.get("/", restaurantController.getAllRestaurants);
router.get("/:restaurantId", restaurantController.getRestaurantById);

// Restaurant Admin / Super Admin APIs
router.post(
  "/",
  authenticate,
  authorize("restaurant_admin", "super_admin"),
  createRestaurantValidator,
  validate,
  restaurantController.createRestaurant
);

router.patch(
  "/:restaurantId",
  authenticate,
  authorize("restaurant_admin", "super_admin"),
  updateRestaurantValidator,
  validate,
  restaurantController.updateRestaurant
);

router.delete(
  "/:restaurantId",
  authenticate,
  authorize("restaurant_admin", "super_admin"),
  restaurantController.deleteRestaurant
);

// Nested Category routes
router.get("/:restaurantId/categories", categoryController.getCategoriesByRestaurant);
router.post(
  "/:restaurantId/categories",
  authenticate,
  authorize("restaurant_admin", "super_admin"),
  createCategoryValidator,
  validate,
  categoryController.createCategory
);

// Nested Menu routes
router.get("/:restaurantId/menu", menuController.getMenuItemsByRestaurant);
router.post(
  "/:restaurantId/menu",
  authenticate,
  authorize("restaurant_admin", "super_admin"),
  createMenuItemValidator,
  validate,
  menuController.createMenuItem
);

// Nested Restaurant Orders route
router.get(
  "/:restaurantId/orders",
  authenticate,
  authorize("restaurant_admin", "super_admin"),
  orderController.getRestaurantOrders
);

// Nested Reviews route
router.get("/:id/reviews", reviewController.getRestaurantReviews);
router.post("/:id/reviews", authenticate, reviewController.createReview);

export default router;
