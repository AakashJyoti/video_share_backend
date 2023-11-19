// require('dotenv').config({path: './env'})

import { app } from "./app.js";
import connectDB from "./src/db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running at ${PORT}`);
    });
  })
  .catch((err) => console.error("MONGO_DB connection failed", err));
