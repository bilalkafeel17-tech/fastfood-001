import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Restaurant owner is required"]
    },
    phone: {
      type: String,
      trim: true,
      default: ""
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ""
    },
    address: {
      type: String,
      required: [true, "Restaurant address is required"],
      trim: true
    },
    city: {
      type: String,
      required: [true, "Restaurant city is required"],
      trim: true
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80"
    },
    openingTime: {
      type: String,
      default: "09:00"
    },
    closingTime: {
      type: String,
      default: "23:00"
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    ratingCount: {
      type: Number,
      default: 0
    },
    deliveryFee: {
      type: Number,
      default: 150,
      min: 0
    },
    minOrder: {
      type: Number,
      default: 0,
      min: 0
    },
    cuisine: {
      type: [String],
      default: ["Fast Food"]
    }
  },
  {
    timestamps: true
  }
);

// Indexes for fast search & filtering
restaurantSchema.index({ name: "text", description: "text", city: "text" });
restaurantSchema.index({ city: 1, isActive: 1, isOpen: 1 });

const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
