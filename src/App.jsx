import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { OrderProvider } from "./context/OrderContext";
import { NotificationProvider } from "./context/NotificationContext";
import { AppRoutes } from "./routes/AppRoutes";

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <FavoritesProvider>
                <OrderProvider>
                  <NotificationProvider>
                    <AppRoutes />
                  </NotificationProvider>
                </OrderProvider>
              </FavoritesProvider>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
