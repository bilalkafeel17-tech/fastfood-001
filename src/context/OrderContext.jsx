import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { orderService } from "../services/orderService";
import { useToast } from "./ToastContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError, showInfo } = useToast();

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data);
      if (data.length > 0 && !activeOrderId) {
        // Set the most recent non-delivered order as active if exists
        const inProgress = data.find((o) => o.status !== "Delivered" && o.status !== "Cancelled");
        if (inProgress) setActiveOrderId(inProgress.id);
        else setActiveOrderId(data[0].id);
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  }, [activeOrderId]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const createOrder = async (orderPayload) => {
    try {
      const newOrder = await orderService.createOrder(orderPayload);
      setOrders((prev) => [newOrder, ...prev]);
      setActiveOrderId(newOrder.id);
      showSuccess(`Order ${newOrder.id} placed successfully!`);
      return newOrder;
    } catch (err) {
      showError(err.message || "Failed to place order");
      throw err;
    }
  };

  const getOrderById = (id) => {
    return orders.find((o) => String(o.id) === String(id)) || null;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const updated = await orderService.updateStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (String(o.id) === String(orderId) ? updated : o)));
      showSuccess(`Order ${orderId} updated to "${newStatus}"!`);
      return updated;
    } catch (err) {
      showError(err.message || "Failed to update order status");
      throw err;
    }
  };

  const cancelOrder = async (orderId, reason) => {
    try {
      const updated = await orderService.cancelOrder(orderId, reason);
      setOrders((prev) => prev.map((o) => (String(o.id) === String(orderId) ? updated : o)));
      showInfo(`Order ${orderId} has been cancelled.`);
      return updated;
    } catch (err) {
      showError(err.message || "Failed to cancel order");
      throw err;
    }
  };

  // Live simulation helper: advances an active order through stages
  const advanceOrderStage = async (orderId) => {
    const order = getOrderById(orderId);
    if (!order) return;

    const sequence = ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];
    const currentIdx = sequence.indexOf(order.status);
    if (currentIdx > -1 && currentIdx < sequence.length - 1) {
      const nextStatus = sequence[currentIdx + 1];
      await updateOrderStatus(orderId, nextStatus);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrderId,
        setActiveOrderId,
        loading,
        createOrder,
        getOrderById,
        updateOrderStatus,
        cancelOrder,
        advanceOrderStage,
        refreshOrders: loadOrders
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
