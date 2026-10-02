import { Router } from "express";
import * as reviewController from "../controllers/review.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.delete("/:id", authenticate, reviewController.deleteReview);

export default router;
