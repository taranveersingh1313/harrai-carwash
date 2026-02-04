const express = require('express');
const router = express.Router();
const  authMiddleware  = require('../../middlewares/authMiddleware');
const {
  getAdminList,
} = require("../../controllers/Admin/AdminListController");

// POST /api/admin/admin-list
router.get('/admin-list', authMiddleware, getAdminList);
module.exports = router;