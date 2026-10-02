# CraveBite — Restaurant Backend REST API

A production-ready **Restaurant Backend REST API** built with **Node.js**, **Express.js**, **MongoDB & Mongoose**, featuring JSON Web Token (JWT) authentication, Role-Based Access Control (RBAC), multi-restaurant support, food categories, dynamic menus, single-restaurant cart management, order processing with state machine status validation, and an administrative analytics dashboard.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18.x or later recommended)
- **MongoDB** (Local instance or MongoDB Atlas URI. If no local MongoDB service is running, the project automatically initializes an in-memory database fallback for effortless local testing!)

### 2. Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### 3. Environment Variables
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Default `.env` configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/restaurant_db
JWT_SECRET=cravebite_super_secret_jwt_key_2026!@#
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### 4. Seed Database
Populate the database with sample users, restaurants, categories, and menu items:
```bash
npm run seed
```

### 5. Run Backend Server
Start the Express server on port 5000:
```bash
npm start
```
The server will start at `http://localhost:5000`. Test the health check endpoint at:
```
GET http://localhost:5000/api/health
```

### 6. Run Automated Test Suite
Run the comprehensive automated integration test suite:
```bash
npm test
```

---

## 👥 Seeded User Accounts

When you run `npm run seed`, the database is populated with the following pre-configured credentials:

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `superadmin@cravebite.com` | `Admin@123` | Platform oversight, all orders, block users, view statistics |
| **Restaurant Admin 1** | `admin1@cravebite.com` | `Admin@123` | CraveBite Burgers & Golden Crunch Chicken management |
| **Restaurant Admin 2** | `admin2@cravebite.com` | `Admin@123` | Bella Italia Pizzeria management |
| **Customer 1** | `john@example.com` | `Customer@123` | Browsing, cart, orders, reviews |
| **Customer 2** | `sarah@example.com` | `Customer@123` | Browsing, cart, orders |
| **Customer 3** | `alex@example.com` | `Customer@123` | Browsing, cart, orders |

---

## 🏗️ Project Structure

The project follows a clean, modular, and maintainable MVC architecture:

```
src/
├── config/
│   ├── database.js               # MongoDB connection with Mongoose & memory fallback
│   └── env.js                    # Environment variables loader
│
├── controllers/
│   ├── auth.controller.js        # Register, login, logout
│   ├── user.controller.js        # Profile and password change
│   ├── restaurant.controller.js  # Restaurant CRUD & filters
│   ├── category.controller.js    # Category management
│   ├── menu.controller.js        # Menu items CRUD & availability toggle
│   ├── cart.controller.js        # Cart management & single-restaurant enforcement
│   ├── order.controller.js       # Order creation, tracking, status transitions
│   ├── admin.controller.js       # User management & platform dashboard stats
│   └── review.controller.js      # Customer reviews & ratings
│
├── models/
│   ├── User.js                   # User schema (roles: customer, restaurant_admin, super_admin)
│   ├── Restaurant.js             # Restaurant schema (owner ref, address, hours, status)
│   ├── Category.js               # Category schema (tied to restaurant)
│   ├── MenuItem.js               # MenuItem schema (tied to restaurant and category)
│   ├── Cart.js                   # Cart schema (single-restaurant cart, price snapshots)
│   ├── Order.js                  # Order schema (item snapshots, state machine status, history)
│   ├── Review.js                 # Review schema (ratings, comments)
│   └── Coupon.js                 # Coupon schema (discount codes)
│
├── middleware/
│   ├── auth.middleware.js        # JWT Bearer token authentication
│   ├── role.middleware.js        # Role-based access control (RBAC) & ownership verification
│   ├── error.middleware.js       # Centralized error handler & 404 handler
│   ├── validate.middleware.js    # Request body validation processor
│   └── upload.middleware.js      # Multer file upload handler
│
├── validators/
│   ├── auth.validator.js         # Validation rules for auth
│   ├── user.validator.js         # Validation rules for user profile/password
│   ├── restaurant.validator.js   # Validation rules for restaurants
│   ├── category.validator.js     # Validation rules for categories
│   ├── menu.validator.js         # Validation rules for menu items
│   ├── cart.validator.js         # Validation rules for cart operations
│   └── order.validator.js        # Validation rules for orders
│
├── routes/
│   ├── auth.routes.js            # /api/auth/*
│   ├── user.routes.js            # /api/users/*
│   ├── restaurant.routes.js      # /api/restaurants/*
│   ├── category.routes.js        # /api/categories/*
│   ├── menu.routes.js            # /api/menu/*
│   ├── cart.routes.js            # /api/cart/*
│   ├── order.routes.js           # /api/orders/*
│   ├── admin.routes.js           # /api/admin/*
│   └── review.routes.js          # /api/reviews/*
│
├── services/
│   ├── auth.service.js           # Auth & JWT business logic
│   ├── restaurant.service.js     # Search and filter queries
│   ├── cart.service.js           # Cart calculations and server-side price fetching
│   └── order.service.js          # Order state machine and snapshot generation
│
├── utils/
│   ├── apiResponse.js            # Standardized API response format
│   ├── jwt.js                    # JWT signing and verification
│   ├── generateOrderNumber.js    # Unique readable order number generator
│   └── validateObjectId.js       # MongoDB ObjectId validation
│
├── seed/
│   └── seedData.js               # Seed script logic
│
├── app.js                        # Express application & route mounting
└── server.js                     # Server entrypoint
```

---

## 🔒 Security & Architecture Highlights

1. **Password Hashing**: Stored using `bcryptjs` with 10 salt rounds. Password fields are marked with `select: false` to ensure passwords are never exposed.
2. **Server-Side Price Integrity**: Cart totals and order snapshots are computed **strictly using database prices**. Client-supplied prices and totals are never trusted.
3. **Single-Restaurant Cart Enforcement**: A cart can only contain items from a single restaurant at a time. Adding items from another restaurant triggers an explanatory error.
4. **Order Status State Machine**:
   - Order transitions strictly follow: `pending` → `confirmed` → `preparing` → `ready` → `out_for_delivery` → `delivered`.
   - Arbitrary or illegal status jumps (e.g. jumping from `pending` directly to `delivered`) are blocked with HTTP 400.
   - Customers can only cancel orders in `pending` or `confirmed` status.
5. **Role-Based Authorization**:
   - Customers cannot access restaurant management or administrative endpoints.
   - Restaurant admins can only edit categories, menu items, and orders belonging to **their own restaurant**.
   - Super admins have global administrative privileges.
6. **Rate Limiting**: Protects `/api/auth/*` endpoints against brute-force attacks using `express-rate-limit`.
7. **Robust Error Handling**: Express middleware safely captures MongoDB `CastError`, duplicate key `11000`, Mongoose `ValidationError`, and expired JWT tokens with clear JSON messages.

---

## 📡 Complete REST API Reference

### 1. Authentication
- `POST /api/auth/register` — Register new customer account
- `POST /api/auth/login` — Login and receive JWT access token
- `POST /api/auth/logout` — Logout session

### 2. User Profile
- `GET /api/users/me` — Get current authenticated user profile
- `PATCH /api/users/me` — Update name, phone, address, city
- `PATCH /api/users/change-password` — Change password with current password verification

### 3. Restaurants
- `GET /api/restaurants` — List restaurants (Supports `page`, `limit`, `search`, `city`, `isOpen`, `isActive`)
- `GET /api/restaurants/:restaurantId` — Get restaurant details with active categories and menu items
- `POST /api/restaurants` — Create new restaurant *(Restaurant Admin / Super Admin)*
- `PATCH /api/restaurants/:restaurantId` — Update restaurant *(Owner / Super Admin)*
- `DELETE /api/restaurants/:restaurantId` — Soft deactivate restaurant *(Owner / Super Admin)*

### 4. Categories
- `GET /api/restaurants/:restaurantId/categories` — Get restaurant categories
- `POST /api/restaurants/:restaurantId/categories` — Create category *(Owner / Super Admin)*
- `GET /api/categories/:categoryId` — Get category by ID
- `PATCH /api/categories/:categoryId` — Update category *(Owner / Super Admin)*
- `DELETE /api/categories/:categoryId` — Delete category *(Owner / Super Admin)*

### 5. Menu Items
- `GET /api/restaurants/:restaurantId/menu` — List menu items (Supports `category`, `search`, `minPrice`, `maxPrice`, `isAvailable`, `page`, `limit`)
- `POST /api/restaurants/:restaurantId/menu` — Create menu item *(Owner / Super Admin)*
- `GET /api/menu/:menuItemId` — Get menu item details
- `PATCH /api/menu/:menuItemId` — Update menu item *(Owner / Super Admin)*
- `DELETE /api/menu/:menuItemId` — Delete menu item *(Owner / Super Admin)*
- `PATCH /api/menu/:menuItemId/availability` — Toggle item availability *(Owner / Super Admin)*

### 6. Cart
- `GET /api/cart` — Get authenticated user's cart with live calculations
- `POST /api/cart/items` — Add item to cart (`{ menuItemId, quantity }`)
- `PATCH /api/cart/items/:menuItemId` — Update item quantity (`{ quantity }`)
- `DELETE /api/cart/items/:menuItemId` — Remove item from cart
- `DELETE /api/cart` — Clear entire cart

### 7. Orders
- `POST /api/orders` — Place order from current cart (`{ deliveryAddress, phone, paymentMethod, notes }`)
- `GET /api/orders/my-orders` — Get customer's order history (`?page=1&limit=10&status=delivered`)
- `GET /api/orders/:orderId` — Get order details and status history
- `PATCH /api/orders/:orderId/cancel` — Cancel order *(Allowed for pending/confirmed status)*
- `PATCH /api/orders/:orderId/status` — Update order status *(Restaurant Admin / Super Admin)*
- `GET /api/restaurants/:restaurantId/orders` — Get restaurant orders *(Owner / Super Admin, supports filters)*

### 8. Super Admin
- `GET /api/admin/dashboard` — Platform analytics (Total users, restaurants, orders, revenue)
- `GET /api/admin/users` — List platform users with role filters and pagination
- `PATCH /api/admin/users/:userId/status` — Block or unblock user account
- `GET /api/admin/restaurants` — List all restaurants (including inactive)
- `GET /api/admin/orders` — List all orders across platform

### 9. Reviews
- `GET /api/restaurants/:restaurantId/reviews` — Get customer reviews for a restaurant
- `POST /api/restaurants/:restaurantId/reviews` — Submit review and rating *(Customer)*
- `DELETE /api/reviews/:reviewId` — Delete review *(Author / Super Admin)*

---

## 🧪 Testing with Postman & Thunder Client

1. Open Postman or Thunder Client.
2. Import `postman_collection.json` (or `thunder-collection.json`).
3. Set the `baseUrl` variable to `http://localhost:5000/api`.
4. Execute `Login Customer` or `Login Super Admin` to obtain a Bearer token and test any endpoint!

---

## 📊 Standard API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Restaurant fetched successfully",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 30,
    "totalPages": 3
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Validation failed. Please check the provided fields.",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    }
  ]
}
```
