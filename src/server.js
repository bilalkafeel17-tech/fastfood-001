import app from "./app.js";
import { connectDB } from "./config/database.js";
import { ENV } from "./config/env.js";

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(ENV.PORT, () => {
      console.log(` CraveBite Restaurant Backend API running on port ${ENV.PORT}`);
    });

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
