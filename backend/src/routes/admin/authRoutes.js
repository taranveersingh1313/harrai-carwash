const express = require('express');
const router = express.Router();
const LoginController = require('../../controllers/Admin/auth/LoginController');
const { adminLogout } = require("../../controllers/Admin/auth/LogoutController");

// POST /api/auth/login
router.post('/login', LoginController.adminlogin);
router.post('/logout', adminLogout);

module.exports = router;