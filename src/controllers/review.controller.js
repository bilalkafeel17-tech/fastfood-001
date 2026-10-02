import Review from "../models/Review.js";
import Restaurant from "../models/Restaurant.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import { isValidObjectId } from "../utils/validateObjectId.js";

/**
 * Get reviews for a restaurant
 */
export const getRestaurantReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return sendError(res, { statusCode: 400, message: "Invalid Restaurant ID format" });
    }

    const reviews = await Review.find({ restaurant: id })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    return sendSuccess(res, {
      statusCode: 200,
      message: "Reviews fetched successfully",
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a review for a restaurant
 */
export const createReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment, orderId } = req.body;

    if (!isValidObjectId(id)) {
      return sendError(res, { statusCode: 400, message: "Invalid Restaurant ID format" });
    }

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return sendError(res, { statusCode: 404, message: "Restaurant not found" });
    }

    const review = await Review.create({
      restaurant: id,
      user: req.user._id,
      order: orderId && isValidObjectId(orderId) ? orderId : undefined,
      rating: Number(rating),
      comment: comment || ""
    });

    // Update restaurant rating
    const reviews = await Review.find({ restaurant: id });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    restaurant.rating = Math.round(avgRating * 10) / 10;
    restaurant.ratingCount = reviews.length;
    await restaurant.save();

    const populated = await Review.findById(review._id).populate("user", "name avatar");

    return sendSuccess(res, {
      statusCode: 201,
      message: "Review created successfully",
      data: populated
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a review (Review author or Super Admin)
 */
export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return sendError(res, { statusCode: 400, message: "Invalid Review ID format" });
    }

    const review = await Review.findById(id);
    if (!review) {
      return sendError(res, { statusCode: 404, message: "Review not found" });
    }

    if (req.user.role !== "super_admin" && review.user.toString() !== req.user._id.toString()) {
      return sendError(res, { statusCode: 403, message: "Access denied." });
    }

    await Review.findByIdAndDelete(id);

    return sendSuccess(res, {
      statusCode: 200,
      message: "Review deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
