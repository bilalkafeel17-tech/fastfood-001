import mongoose from "mongoose";

/**
 * Validates if the given string is a valid MongoDB ObjectId
 */
export const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
