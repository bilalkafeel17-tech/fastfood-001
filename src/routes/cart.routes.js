import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { addToCartValidator, updateCartItemValidator } from "../validators/cart.validator.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

// Cart is for authenticated customers
router.use(authenticate);

router.get("/", cartController.getCart);
router.post("/items", addToCartValidator, validate, cartController.addItem);
router.patch("/items/:menuItemId", updateCartItemValidator, validate, cartController.updateItemQuantity);
router.delete("/items/:menuItemId", cartController.removeItem);
router.delete("/", cartController.clearCart);

export default router;
