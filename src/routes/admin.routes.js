import { Router } from "express";
import * as adminController from "../controllers/admin.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

// All admin routes strictly require authentication and super_admin role
router.use(authenticate, authorize("super_admin"));

router.get("/users", adminController.getUsers);
router.patch("/users/:userId/status", adminController.toggleUserStatus);
router.get("/restaurants", adminController.getAllRestaurantsAdmin);
router.get("/orders", adminController.getAllOrdersAdmin);
router.get("/dashboard", adminController.getDashboardStats);

export default router;
