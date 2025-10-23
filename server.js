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
mongoose
  .connect(process.env.MONGODB_URI || MONGO_URL || "mongodb://localhost:27017/ambedkar-jayanti")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/api/members", memberRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
