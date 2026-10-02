import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { updateProfileValidator, changePasswordValidator } from "../validators/user.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

// All user routes require authentication
router.use(authenticate);

router.get("/me", userController.getMe);
router.patch("/me", updateProfileValidator, validate, userController.updateMe);
router.patch("/change-password", changePasswordValidator, validate, userController.changePassword);

export default router;
