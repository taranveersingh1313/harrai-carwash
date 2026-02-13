import express from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import upload from "../../middlewares/upload.js";
import { getAdminList, SaveAdmin,EditAdmin,UpdateAdmin,DeleteAdmin } from "../../controllers/Admin/AdminListController.js";
import { GetProfile, UpdateProfile } from "../../controllers/Admin/ProfileController.js";
import { getList, SaveCustomer,EditCustomer,UpdateCustomer,DeleteCustomer } from "../../controllers/Admin/CustomerController.js";

const router = express.Router();

// GET /api/admin/admin-list
router.get("/admin-list", authMiddleware, getAdminList);
router.post("/save-admin", authMiddleware, SaveAdmin);
router.get("/edit-admin/:id", authMiddleware, EditAdmin);
router.put("/update-admin/:id", authMiddleware, UpdateAdmin);
router.delete("/delete-admin/:id", authMiddleware, DeleteAdmin);

router.get("/profile", authMiddleware, GetProfile);
router.put("/profile-update", authMiddleware, upload.single("admin_img"), UpdateProfile);

// customer routes
router.get("/customer-list", authMiddleware, getList);
router.post("/save-customer", authMiddleware, SaveCustomer);
router.get("/edit-customer/:id", authMiddleware, EditCustomer);
router.put("/update-customer/:id", authMiddleware, UpdateCustomer);
router.delete("/delete-customer/:id", authMiddleware, DeleteCustomer);

export default router;
