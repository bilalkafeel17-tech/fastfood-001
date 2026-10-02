import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { createOrderValidator, updateOrderStatusValidator } from "../validators/order.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", createOrderValidator, validate, orderController.createOrder);
router.get("/my-orders", orderController.getMyOrders);
router.get("/:orderId", orderController.getOrderById);
router.patch("/:orderId/cancel", orderController.cancelOrder);

router.patch(
  "/:orderId/status",
  authorize("restaurant_admin", "super_admin"),
  updateOrderStatusValidator,
  validate,
  orderController.updateOrderStatus
);

export default router;
