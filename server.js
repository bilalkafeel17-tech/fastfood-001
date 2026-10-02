import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";
import { ENV } from "./src/config/env.js";

const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    const server = app.listen(ENV.PORT, () => {
      console.log(`====================================================`);
      console.log(` CraveBite Restaurant Backend API Server Started!`);
      console.log(` Port: ${ENV.PORT}`);
      console.log(` Environment: ${ENV.NODE_ENV}`);
      console.log(` Health Check: http://localhost:${ENV.PORT}/api/health`);
      console.log(`====================================================`);
    });

    // Handle Unhandled Promise Rejections
    process.on("unhandledRejection", (err) => {
      console.error(`Unhandled Promise Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error(`Server startup error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
