// const { log } = require('node:console');
import Admin from "../../../Models/Admin/LoginModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Check if user exists
    const admin = await Admin.findByEmailOrUsername(email, email);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // 2. Compare entered password with hashed password in DB
   const isMatch = await bcrypt.compare(password, admin.password);
  //  const isMatch = (password == admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Create a JWT Token
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || 'shiriguruharraisahib',
      { expiresIn: '1d' }
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