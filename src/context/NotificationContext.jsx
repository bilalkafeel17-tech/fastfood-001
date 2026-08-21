import React, { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();
const STORAGE_KEY = "cravebite_notifications_v2";

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Order Sizzling Away! 🔥",
    message: "Your order ORD-9841 is currently out for delivery by driver Jake.",
    type: "order",
    target: "customer",
    read: false,
    timestamp: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    id: "notif-2",
    title: "New Promo Coupon Available 🎉",
    message: "Use code CRAVE20 to get 20% off your next gourmet feast!",
    type: "promo",
    target: "customer",
    read: false,
    timestamp: new Date(Date.now() - 60 * 60000).toISOString()
  },
  {
    id: "notif-3",
    title: "New Online Order Received",
    message: "Order ORD-9841 ($49.72) has been placed by Alex Jordan.",
    type: "admin",
    target: "admin",
    read: false,
    timestamp: new Date(Date.now() - 25 * 60000).toISOString()
  },
  {
    id: "notif-4",
    title: "Low Stock Alert ⚠️",
    message: "Truffle Mushroom Supreme Burger stock is down to 25 units.",
    type: "alert",
    target: "admin",
    read: true,
    timestamp: new Date(Date.now() - 120 * 60000).toISOString()
  }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notif) => {
    const item = {
      ...notif,
      id: "notif-" + Date.now(),
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications((prev) => [item, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = (target = null) => {
    setNotifications((prev) =>
      prev.map((n) => (!target || n.target === target ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCustomerCount = notifications.filter((n) => n.target === "customer" && !n.read).length;
  const unreadAdminCount = notifications.filter((n) => n.target === "admin" && !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCustomerCount,
        unreadAdminCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
