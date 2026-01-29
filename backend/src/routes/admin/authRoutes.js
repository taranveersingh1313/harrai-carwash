const express = require('express');
const router = express.Router();
const LoginController = require('../../controllers/Admin/auth/LoginController');

// POST /api/auth/login
router.post('/login', LoginController.adminlogin);

module.exports = router;