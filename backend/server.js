import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import studentRoutes from "./routes/studentRoutes.js";
import markRoutes from "./routes/markRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";

// Load env variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API Routes
app.use("/api/students", studentRoutes);
app.use("/api/marks", markRoutes);
app.use("/api/subjects", subjectRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});