import Cart from "../models/Cart.js";
import MenuItem from "../models/MenuItem.js";
import Restaurant from "../models/Restaurant.js";

/**
 * Recalculate cart totals based on live DB prices
 */
const recalculateCart = async (cart) => {
  if (!cart.items || cart.items.length === 0) {
    cart.restaurant = null;
    cart.items = [];
    cart.subtotal = 0;
    cart.deliveryFee = 0;
    cart.discount = 0;
    cart.total = 0;
    return cart;
  }

  let subtotal = 0;
  for (const item of cart.items) {
    const menuItem = await MenuItem.findById(item.menuItem);
    if (menuItem && menuItem.isAvailable) {
      const activePrice =
        menuItem.discountPrice !== null && menuItem.discountPrice !== undefined
          ? menuItem.discountPrice
          : menuItem.price;
      item.price = activePrice;
      subtotal += activePrice * item.quantity;
    }
  }

  // Get restaurant delivery fee
  let deliveryFee = 0;
  if (cart.restaurant) {
    const restaurant = await Restaurant.findById(cart.restaurant);
    if (restaurant) {
      deliveryFee = restaurant.deliveryFee || 0;
    }
  }

  cart.subtotal = Math.round(subtotal * 100) / 100;
  cart.deliveryFee = deliveryFee;
  cart.discount = cart.discount || 0;
  cart.total = Math.max(0, Math.round((cart.subtotal + cart.deliveryFee - cart.discount) * 100) / 100);

  return cart;
};

export const cartService = {
  /**
   * Get user's cart, populated with MenuItem and Restaurant details
   */
  getUserCart: async (userId) => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
        restaurant: null,
        subtotal: 0,
        deliveryFee: 0,
        discount: 0,
        total: 0
      });
    }

    // Refresh calculations
    await recalculateCart(cart);
    await cart.save();

    return await Cart.findById(cart._id)
      .populate("restaurant", "name address city image phone deliveryFee isOpen isActive")
      .populate("items.menuItem", "name description price discountPrice image isAvailable preparationTime");
  },

  /**
   * Add an item to the cart
   */
  addItem: async (userId, menuItemId, quantity = 1) => {
    const qty = Math.max(1, parseInt(quantity, 10) || 1);

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      const error = new Error("Menu item not found");
      error.statusCode = 404;
      throw error;
    }

    if (!menuItem.isAvailable) {
      const error = new Error(`'${menuItem.name}' is currently unavailable`);
      error.statusCode = 400;
      throw error;
    }

    const restaurant = await Restaurant.findById(menuItem.restaurant);
    if (!restaurant || !restaurant.isActive) {
      const error = new Error("The restaurant offering this item is currently not active");
      error.statusCode = 400;
      throw error;
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        restaurant: menuItem.restaurant,
        items: []
      });
    }

    // Enforce single restaurant rule
    if (
      cart.items.length > 0 &&
      cart.restaurant &&
      cart.restaurant.toString() !== menuItem.restaurant.toString()
    ) {
      const error = new Error(
        "Your cart already contains items from another restaurant. Please clear your cart first before ordering from a different restaurant."
      );
      error.statusCode = 400;
      throw error;
    }

    cart.restaurant = menuItem.restaurant;

    const existingIndex = cart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemId.toString()
    );

    const price =
      menuItem.discountPrice !== null && menuItem.discountPrice !== undefined
        ? menuItem.discountPrice
        : menuItem.price;

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += qty;
      cart.items[existingIndex].price = price;
    } else {
      cart.items.push({
        menuItem: menuItem._id,
        quantity: qty,
        price
      });
    }

    await recalculateCart(cart);
    await cart.save();

    return await cartService.getUserCart(userId);
  },

  /**
   * Update quantity of a menu item in cart
   */
  updateItemQuantity: async (userId, menuItemId, quantity) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      const error = new Error("Cart not found");
      error.statusCode = 404;
      throw error;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemId.toString()
    );

    if (itemIndex === -1) {
      const error = new Error("Item not found in cart");
      error.statusCode = 404;
      throw error;
    }

    const qty = parseInt(quantity, 10);
    if (qty <= 0) {
      cart.items.splice(itemIndex, 1);
      if (cart.items.length === 0) {
        cart.restaurant = null;
      }
    } else {
      cart.items[itemIndex].quantity = qty;
    }

    await recalculateCart(cart);
    await cart.save();

    return await cartService.getUserCart(userId);
  },

  /**
   * Remove a single item from cart
   */
  removeItem: async (userId, menuItemId) => {
    return await cartService.updateItemQuantity(userId, menuItemId, 0);
  },

  /**
   * Clear entire cart
   */
  clearCart: async (userId) => {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
        restaurant: null,
        subtotal: 0,
        deliveryFee: 0,
        discount: 0,
        total: 0
      });
      return cart;
    }

    cart.items = [];
    cart.restaurant = null;
    cart.subtotal = 0;
    cart.deliveryFee = 0;
    cart.discount = 0;
    cart.total = 0;
    await cart.save();

    return cart;
  }
};
