import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { getAdminList, SaveAdmin,EditAdmin,UpdateAdmin,DeleteAdmin } from "../../controllers/Admin/AdminListController.js";

const router = express.Router();

// GET /api/admin/admin-list
router.get("/admin-list", authMiddleware, getAdminList);

// POST /api/admin/save-admin
router.post("/save-admin", authMiddleware, SaveAdmin);
router.get("/edit-admin/:id", authMiddleware, EditAdmin);
router.put("/update-admin/:id", authMiddleware, UpdateAdmin);
router.delete("/delete-admin/:id", authMiddleware, DeleteAdmin);

export default router;
