
import Admin from "../../Models/Admin/AdminModel.js";

// export const getAdminList = async (req, res) => {
//   try {
//     const admins = await Admin.getAllAdmins(); // DB function

//     return res.status(200).json({
//       success: true,
//       data: admins,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch admins",
//       error: err.message,
//     });
//   }
// };

export const getAdminList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    const search = req.query.search || "";

    const { admins, total } = await Admin.getAdminList(limit, offset, search);

    return res.status(200).json({
      success: true,
      data: admins,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
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
    const adminId = req.params.id;

    const result = await Admin.DeleteAdmin(adminId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: {
        id: result.id,
      },
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete admin",
      error: err.message,
    });
  }
};
