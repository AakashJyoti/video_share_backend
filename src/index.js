import "dotenv/config.js";
import { app } from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running at ${PORT}\n`);
    });
  })
  .catch((err) => console.error("MONGO_DB connection failed", err));
