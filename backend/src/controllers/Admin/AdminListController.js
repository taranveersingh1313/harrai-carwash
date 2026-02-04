const Admin = require("../../Models/Admin/AdminModel.js");

exports.getAdminList = async (req, res) => {
  try {
    const admins = await Admin.getAllAdmins(); // DB function

    return res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admins",
      error: err.message,
    });
  }
};
