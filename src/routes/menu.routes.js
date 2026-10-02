import { Router } from "express";
import * as menuController from "../controllers/menu.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { updateMenuItemValidator } from "../validators/menu.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.get("/:menuItemId", menuController.getMenuItemById);

router.patch(
  "/:menuItemId",
  authenticate,
  authorize("restaurant_admin", "super_admin"),
  updateMenuItemValidator,
  validate,
  menuController.updateMenuItem
);

router.delete(
  "/:menuItemId",
  authenticate,
  authorize("restaurant_admin", "super_admin"),
  menuController.deleteMenuItem
);

router.patch(
  "/:menuItemId/availability",
  authenticate,
  authorize("restaurant_admin", "super_admin"),
  menuController.toggleAvailability
);

export default router;
