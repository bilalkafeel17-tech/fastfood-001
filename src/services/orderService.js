import { INITIAL_ORDERS } from "../data/initialOrders";

const STORAGE_KEY = "cravebite_orders_data";

const getStoredOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
};

const saveOrders = (orders) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export const orderService = {
  getAll: async () => {
    await new Promise((r) => setTimeout(r, 150));
    return getStoredOrders();
  },

  getById: async (id) => {
    await new Promise((r) => setTimeout(r, 100));
    const list = getStoredOrders();
    return list.find((o) => String(o.id) === String(id)) || null;
  },

  getByCustomerId: async (customerId) => {
    await new Promise((r) => setTimeout(r, 120));
    const list = getStoredOrders();
    return list.filter((o) => o.customer && o.customer.id === customerId);
  },

  createOrder: async (orderPayload) => {
    await new Promise((r) => setTimeout(r, 300));
    const list = getStoredOrders();
    const orderNumber = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    
    // Default 5-step status timeline
    const timeline = [
      { status: "Order Placed", time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), completed: true },
      { status: "Order Confirmed", time: "Pending", completed: false },
      { status: "Preparing in Kitchen", time: "Pending", completed: false },
      { status: "Out for Delivery", time: "Pending", completed: false },
      { status: "Delivered", time: "Pending", completed: false }
    ];

    const newOrder = {
      id: orderNumber,
      createdAt: now.toISOString(),
      status: "Pending",
      paymentStatus: orderPayload.paymentMethod?.includes("Cash") ? "Pending" : "Paid",
      estimatedDeliveryTime: new Date(now.getTime() + 25 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      driver: {
        name: "Jake Reynolds",
        phone: "+1 (555) 567-8901",
        vehicle: "Honda Civic (Red, Plate: CRV-882)",
        rating: 4.9
      },
      timeline,
      ...orderPayload
    };

    const updated = [newOrder, ...list];
    saveOrders(updated);
    return newOrder;
  },

  updateStatus: async (orderId, newStatus) => {
    await new Promise((r) => setTimeout(r, 200));
    const list = getStoredOrders();
    const idx = list.findIndex((o) => String(o.id) === String(orderId));
    if (idx === -1) throw new Error("Order not found");

    const order = { ...list[idx] };
    order.status = newStatus;

    const statuses = ["Order Placed", "Order Confirmed", "Preparing in Kitchen", "Out for Delivery", "Delivered"];
    const statusMap = {
      "Pending": 0,
      "Confirmed": 1,
      "Preparing": 2,
      "Ready": 2,
      "Out for Delivery": 3,
      "Delivered": 4,
      "Cancelled": -1
    };

    const currentStepIndex = statusMap[newStatus] !== undefined ? statusMap[newStatus] : 0;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (order.timeline) {
      order.timeline = order.timeline.map((step, sIdx) => {
        if (sIdx <= currentStepIndex) {
          return {
            ...step,
            completed: true,
            time: step.time === "Pending" ? nowStr : step.time
          };
        }
        return { ...step, completed: false };
      });
    }

    if (newStatus === "Delivered") {
      order.paymentStatus = "Paid";
    }

    list[idx] = order;
    saveOrders(list);
    return order;
  },

  cancelOrder: async (orderId, reason = "Customer Request") => {
    await new Promise((r) => setTimeout(r, 200));
    const list = getStoredOrders();
    const idx = list.findIndex((o) => String(o.id) === String(orderId));
    if (idx === -1) throw new Error("Order not found");

    list[idx].status = "Cancelled";
    list[idx].cancelReason = reason;
    saveOrders(list);
    return list[idx];
  }
};
