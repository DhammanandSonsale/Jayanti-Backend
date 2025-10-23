import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import memberRoutes from "./routes/memberRoutes.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
let isConnected = false; // track connection status

const connectToDatabase = async () => {
  if (isConnected) return; // already connected

  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/ambedkar-jayanti";

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true; // mark as connected
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // throw so request fails if DB not connected
  }
};

// Middleware to connect before handling requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});


// Routes
app.use("/api/members", memberRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" })
})

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

export default app;
