// util.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Member from "./models/Member.js"; // make sure path is correct

dotenv.config();

// Dummy data
const dummyData = [
  { name: "Rajesh Kumar", amount: 500, datePaid: "2025-10-23T10:00:00Z" },
  { name: "Sneha Patil", amount: 750, datePaid: "2025-10-22T14:30:00Z" },
  { name: "Amit Sharma", amount: 1000, datePaid: "2025-10-21T09:15:00Z" },
  { name: "Priya Deshmukh", amount: 600, datePaid: "2025-10-20T16:45:00Z" },
  { name: "Vikram Singh", amount: 800, datePaid: "2025-10-19T12:00:00Z" }
];

// Connect to MongoDB
const connectAndInsert = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MONGODB_URI not defined in .env");

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ Connected to MongoDB Atlas");

    // Insert dummy data
    const inserted = await Member.insertMany(dummyData);
    console.log("✅ Dummy data inserted successfully!");
    console.log(inserted);

    // Close connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

connectAndInsert();
