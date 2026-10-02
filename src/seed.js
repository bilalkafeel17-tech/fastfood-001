import { seedDatabase } from "./seed/seedData.js";
import { disconnectDB } from "./config/database.js";

seedDatabase()
  .then(() => {
    disconnectDB();
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    disconnectDB();
    process.exit(1);
  });
