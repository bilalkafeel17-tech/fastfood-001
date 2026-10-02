import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant reference is required"]
    },
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    sortOrder: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

categorySchema.index({ restaurant: 1, sortOrder: 1 });

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
