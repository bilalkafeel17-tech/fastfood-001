import Restaurant from "../models/Restaurant.js";
import Category from "../models/Category.js";
import MenuItem from "../models/MenuItem.js";

export const restaurantService = {
  /**
   * Search and filter restaurants with pagination
   */
  getRestaurants: async ({
    page = 1,
    limit = 10,
    search = "",
    city = "",
    isOpen = null,
    isActive = true,
    cuisine = ""
  }) => {
    const query = {};

    if (isActive !== null && isActive !== undefined) {
      query.isActive = isActive === "true" || isActive === true;
    }

    if (isOpen !== null && isOpen !== undefined && isOpen !== "") {
      query.isOpen = isOpen === "true" || isOpen === true;
    }

    if (city) {
      query.city = { $regex: new RegExp(city, "i") };
    }

    if (cuisine) {
      query.cuisine = { $in: [new RegExp(cuisine, "i")] };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } }
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const [restaurants, total] = await Promise.all([
      Restaurant.find(query)
        .populate("owner", "name email phone")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Restaurant.countDocuments(query)
    ]);

    return {
      restaurants,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum) || 1
      }
    };
  },

  /**
   * Get restaurant details with active categories and menu items
   */
  getRestaurantDetails: async (restaurantId) => {
    const restaurant = await Restaurant.findById(restaurantId).populate(
      "owner",
      "name email phone"
    );
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    const [categories, menuItems] = await Promise.all([
      Category.find({ restaurant: restaurantId, isActive: true }).sort({ sortOrder: 1 }),
      MenuItem.find({ restaurant: restaurantId, isAvailable: true }).populate("category", "name")
    ]);

    return {
      restaurant,
      categories,
      menuItems
    };
  }
};
