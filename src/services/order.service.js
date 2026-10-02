import Order, { ORDER_STATUSES } from "../models/Order.js";
import Cart from "../models/Cart.js";
import MenuItem from "../models/MenuItem.js";
import Restaurant from "../models/Restaurant.js";
import { generateOrderNumber } from "../utils/generateOrderNumber.js";

// Valid order transition state machine map
const VALID_TRANSITIONS = {
  pending: ["confirmed", "cancelled", "rejected"],
  confirmed: ["preparing", "cancelled"],
  preparing: ["ready"],
  ready: ["out_for_delivery"],
  out_for_delivery: ["delivered"],
  delivered: [],
  cancelled: [],
  rejected: []
};

export const orderService = {
  /**
   * Place a new order from current customer cart
   */
  createOrderFromCart: async (userId, { deliveryAddress, phone, paymentMethod = "cash", notes = "" }) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart || !cart.items || cart.items.length === 0) {
      const error = new Error("Cannot place order with an empty cart");
      error.statusCode = 400;
      throw error;
    }

    if (!cart.restaurant) {
      const error = new Error("Cart is missing restaurant information");
      error.statusCode = 400;
      throw error;
    }

    const restaurant = await Restaurant.findById(cart.restaurant);
    if (!restaurant || !restaurant.isActive) {
      const error = new Error("The selected restaurant is currently not active");
      error.statusCode = 400;
      throw error;
    }

    // Build order items snapshot and verify live availability and DB prices
    const orderItems = [];
    let subtotal = 0;

    for (const item of cart.items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        const error = new Error("One or more items in your cart no longer exist");
        error.statusCode = 400;
        throw error;
      }

      if (!menuItem.isAvailable) {
        const error = new Error(`Item '${menuItem.name}' is currently out of stock or unavailable`);
        error.statusCode = 400;
        throw error;
      }

      const activePrice =
        menuItem.discountPrice !== null && menuItem.discountPrice !== undefined
          ? menuItem.discountPrice
          : menuItem.price;

      const itemSubtotal = Math.round(activePrice * item.quantity * 100) / 100;
      subtotal += itemSubtotal;

      orderItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price: activePrice,
        quantity: item.quantity,
        subtotal: itemSubtotal
      });
    }

    const deliveryFee = restaurant.deliveryFee || 0;
    const discount = cart.discount || 0;
    const total = Math.max(0, Math.round((subtotal + deliveryFee - discount) * 100) / 100);

    const orderNumber = generateOrderNumber();

    const order = await Order.create({
      orderNumber,
      user: userId,
      restaurant: restaurant._id,
      items: orderItems,
      deliveryAddress,
      phone,
      subtotal,
      deliveryFee,
      discount,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "cash" ? "pending" : "paid",
      orderStatus: "pending",
      notes: notes || "",
      statusHistory: [
        {
          status: "pending",
          timestamp: new Date(),
          updatedBy: userId,
          comment: "Order placed by customer"
        }
      ]
    });

    // Clear user cart after successful order creation
    cart.items = [];
    cart.restaurant = null;
    cart.subtotal = 0;
    cart.deliveryFee = 0;
    cart.discount = 0;
    cart.total = 0;
    await cart.save();

    return await Order.findById(order._id)
      .populate("restaurant", "name address phone image city")
      .populate("user", "name email phone");
  },

  /**
   * Cancel an order (Allowed only for 'pending' and 'confirmed' status)
   */
  cancelOrder: async (orderId, user, reason = "Cancelled by user") => {
    const order = await Order.findById(orderId);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    // Role check: customer can only cancel their own order
    if (user.role === "customer" && order.user.toString() !== user._id.toString()) {
      const error = new Error("Access denied. You can only cancel your own orders.");
      error.statusCode = 403;
      throw error;
    }

    if (!["pending", "confirmed"].includes(order.orderStatus)) {
      const error = new Error(
        `Cannot cancel an order with status '${order.orderStatus}'. Only 'pending' or 'confirmed' orders can be cancelled.`
      );
      error.statusCode = 400;
      throw error;
    }

    order.orderStatus = "cancelled";
    order.cancelledReason = reason;
    order.statusHistory.push({
      status: "cancelled",
      timestamp: new Date(),
      updatedBy: user._id,
      comment: reason
    });

    await order.save();
    return order;
  },

  /**
   * Update order status with state machine transition enforcement
   */
  updateStatus: async (orderId, newStatus, updatedByUserId, comment = "") => {
    if (!ORDER_STATUSES.includes(newStatus)) {
      const error = new Error(`Invalid order status: ${newStatus}`);
      error.statusCode = 400;
      throw error;
    }

    const order = await Order.findById(orderId);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }

    const currentStatus = order.orderStatus;

    if (currentStatus === newStatus) {
      return order;
    }

    const allowedNextStatuses = VALID_TRANSITIONS[currentStatus] || [];
    if (!allowedNextStatuses.includes(newStatus)) {
      const error = new Error(
        `Invalid status transition from '${currentStatus}' to '${newStatus}'. Allowed transitions: ${
          allowedNextStatuses.length > 0 ? allowedNextStatuses.join(", ") : "None (terminal status)"
        }`
      );
      error.statusCode = 400;
      throw error;
    }

    order.orderStatus = newStatus;

    if (newStatus === "delivered" && order.paymentMethod === "cash") {
      order.paymentStatus = "paid";
    }

    order.statusHistory.push({
      status: newStatus,
      timestamp: new Date(),
      updatedBy: updatedByUserId,
      comment: comment || `Status updated to ${newStatus}`
    });

    await order.save();
    return order;
  }
};
