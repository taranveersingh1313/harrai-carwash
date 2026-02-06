import express from "express";
import cors from "cors";
import "./config/dbConnect.js"; // just initialize DB
import authRoutes from "./routes/admin/authRoutes.js";
import adminRoutes from "./routes/admin/Routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
