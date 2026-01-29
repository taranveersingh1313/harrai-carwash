const { log } = require('node:console');
const Admin = require('../../../Models/Admin/LoginModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.adminlogin = async (req, res) => {
  const { email, password } = req.body;

  //  log(req.body);

  try {
    // 1. Check if user exists
    // console.log("Searching for identity:", identity);
    const admin = await Admin.findByEmailOrUsername(email, email);
    // console.log("Database returned:", admin);
    
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 2. Compare entered password with hashed password in DB
   const isMatch = (password === admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Create a JWT Token
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || 'shiriguruharraisahib',
      { expiresIn: '1h' }
    );

    // 4. Send response
    res.status(200).json({
      message: "Login successful",
      token,
      admin: { id: admin.id, email: admin.email }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};