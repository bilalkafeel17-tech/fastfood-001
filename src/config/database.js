import mongoose from "mongoose";
import { ENV } from "./env.js";

let memoryServerInstance = null;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 4000
    });
    console.log(` MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(` Local MongoDB connection failed (${error.message}). Attempting in-memory MongoDB fallback...`);
    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      memoryServerInstance = await MongoMemoryServer.create();
      const uri = memoryServerInstance.getUri();
      const conn = await mongoose.connect(uri);
      console.log(` In-Memory MongoDB Connected at: ${uri}`);
      return conn;
    } catch (fallbackError) {
      console.error(` Failed to connect to MongoDB: ${fallbackError.message}`);
      throw fallbackError;
    }
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (memoryServerInstance) {
      await memoryServerInstance.stop();
    }
    console.log("MongoDB Disconnected");
  } catch (error) {
    console.error("Error disconnecting MongoDB:", error.message);
  }
};
