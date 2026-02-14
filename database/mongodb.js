import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error("DB_URI is not set in .env");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
