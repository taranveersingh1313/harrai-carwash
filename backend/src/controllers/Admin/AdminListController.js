
import Admin from "../../Models/Admin/AdminModel.js";

export const getAdminList = async (req, res) => {
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

export const SaveAdmin = async (req, res) => {
  try {
    const newAdmin = await Admin.SaveAdmin(req.body); // DB function
    
    console.log(newAdmin);
    

    return res.status(200).json({
      success: true,
      data: newAdmin,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to save admin",
      error: err.message,
    });
  }
};


export const EditAdmin = async (req, res) => {
  try {
    const admins = await Admin.EditAdmin(req.params.id); // DB function

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


export const UpdateAdmin = async (req, res) => {
  try {
    const updateAdmin = await Admin.UpdateAdmin(req.params.id, req.body); // DB function
    
    console.log(updateAdmin);
    

    return res.status(200).json({
      success: true,
      data: updateAdmin,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update admin",
      error: err.message,
    });
  }
};

export const DeleteAdmin = async (req, res) => {
  try {
    const admins = await Admin.DeleteAdmin(req.params.id); // DB function

    return res.status(200).json({
      success: true,
      data: {
        id: admins.id,
        email: admins.email
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete admin",
      error: err.message,
    });
  }
};