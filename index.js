import app from "./server.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

async function main() {
  dotenv.config();
  const port = process.env.PORT || 5000;

  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("Connected to MongoDB using Mongoose");

    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  } catch (e) {
    console.error("MongoDB connection error:", e);
    process.exit(1);
  }
}

main().catch(console.error);
