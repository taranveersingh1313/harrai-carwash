import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/dbConnect.js"; // just initialize DB
import authRoutes from "./routes/admin/authRoutes.js";
import adminRoutes from "./routes/admin/Routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
