// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import memberRoutes from "./routes/memberRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*", // For production, replace "*" with your frontend URL
}));
app.use(express.json()); // Needed to parse JSON in POST requests

// ✅ MongoDB Connection
const connectToDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MONGODB_URI not defined in .env");

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// ✅ Routes
app.use("/api/admin-login", adminRoutes); // Admin login route
app.use("/api/members", memberRoutes);    // Members route

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// ✅ Start server after DB connection
const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

export default app;
