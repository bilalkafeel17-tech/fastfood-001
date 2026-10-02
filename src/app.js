import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { ENV } from "./config/env.js";

// Import Route Handlers
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import reviewRoutes from "./routes/review.routes.js";

// Import Error Middleware
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Enable CORS for client applications
app.use(
  cors({
    origin: ENV.CLIENT_URL || "*",
    credentials: true
  })
);

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter for Authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 auth requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication requests from this IP, please try again after 15 minutes."
  }
});
app.use("/api/auth", authLimiter);

// Base Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CraveBite Restaurant Backend API is running smoothly",
    timestamp: new Date().toISOString(),
    environment: ENV.NODE_ENV
  });
});

// Mount Application Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);

// Fallback & Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
