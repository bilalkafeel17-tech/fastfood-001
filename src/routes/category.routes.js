import { Router } from "express";
import * as categoryController from "../controllers/category.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { updateCategoryValidator } from "../validators/category.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.get("/:categoryId", categoryController.getCategoryById);

router.patch(
  "/:categoryId",
  authenticate,
  authorize("restaurant_admin", "super_admin"),
  updateCategoryValidator,
  validate,
  categoryController.updateCategory
);

router.delete(
  "/:categoryId",
  authenticate,
  authorize("restaurant_admin", "super_admin"),
  categoryController.deleteCategory
);

export default router;
