// controllers/Admin/auth/LogoutController.js

exports.adminLogout = async (req, res) => {
  try {
    // JWT is stateless → nothing to delete on server
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
