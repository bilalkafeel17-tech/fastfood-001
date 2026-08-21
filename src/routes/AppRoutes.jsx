import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CustomerLayout } from "../layouts/CustomerLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { ProtectedRoute } from "./ProtectedRoute";

// Customer Pages
import { HomePage } from "../pages/customer/HomePage";
import { MenuPage } from "../pages/customer/MenuPage";
import { ProductDetailsPage } from "../pages/customer/ProductDetailsPage";
import { DealsPage } from "../pages/customer/DealsPage";
import { CartPage } from "../pages/customer/CartPage";
import { CheckoutPage } from "../pages/customer/CheckoutPage";
import { OrderSuccessPage } from "../pages/customer/OrderSuccessPage";
import { TrackOrderPage } from "../pages/customer/TrackOrderPage";
import { DashboardPage } from "../pages/customer/DashboardPage";
import { MyOrdersPage } from "../pages/customer/MyOrdersPage";
import { FavoritesPage } from "../pages/customer/FavoritesPage";
import { AddressesPage } from "../pages/customer/AddressesPage";
import { CouponsPage } from "../pages/customer/CouponsPage";
import { NotificationsPage } from "../pages/customer/NotificationsPage";
import { AboutPage } from "../pages/customer/AboutPage";
import { ContactPage } from "../pages/customer/ContactPage";
import { PrivacyTermsPage } from "../pages/customer/PrivacyTermsPage";
import { NotFoundPage } from "../pages/customer/NotFoundPage";

// Auth Pages
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { AdminLoginPage } from "../pages/auth/AdminLoginPage";

// Admin Pages
import { AdminDashboardPage } from "../pages/admin/AdminDashboardPage";
import { AdminOrdersPage } from "../pages/admin/AdminOrdersPage";
import { AdminProductsPage } from "../pages/admin/AdminProductsPage";
import { AdminProductEditPage } from "../pages/admin/AdminProductEditPage";
import { AdminCategoriesPage } from "../pages/admin/AdminCategoriesPage";
import { AdminCustomersPage } from "../pages/admin/AdminCustomersPage";
import { AdminReviewsPage } from "../pages/admin/AdminReviewsPage";
import { AdminCouponsPage } from "../pages/admin/AdminCouponsPage";
import { AdminDealsPage } from "../pages/admin/AdminDealsPage";
import { AdminPaymentsPage } from "../pages/admin/AdminPaymentsPage";
import { AdminDeliveryPage } from "../pages/admin/AdminDeliveryPage";
import { AdminStaffPage } from "../pages/admin/AdminStaffPage";
import { AdminReportsPage } from "../pages/admin/AdminReportsPage";
import { AdminSettingsPage } from "../pages/admin/AdminSettingsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Customer Storefront Routes */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:category" element={<MenuPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/track-order/:id" element={<TrackOrderPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/orders/:id" element={<TrackOrderPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/addresses" element={<AddressesPage />} />
        <Route path="/coupons" element={<CouponsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyTermsPage />} />
        <Route path="/terms" element={<PrivacyTermsPage />} />

        {/* Customer Dashboard Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Auth Pages (Customer layout for styling) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin Management Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="orders/:id" element={<AdminOrdersPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/add" element={<AdminProductEditPage />} />
        <Route path="products/edit/:id" element={<AdminProductEditPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="reviews" element={<AdminReviewsPage />} />
        <Route path="coupons" element={<AdminCouponsPage />} />
        <Route path="deals" element={<AdminDealsPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="delivery" element={<AdminDeliveryPage />} />
        <Route path="staff" element={<AdminStaffPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};
