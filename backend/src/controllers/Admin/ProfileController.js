import Profile from "../../Models/Admin/Profile.js";

export const GetProfile = async (req, res) => {
  try {
    // 🔥 get email from token
    const email = req.admin.email;


    const profile = await Profile.GetProfile(email);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      error: err.message,
    });
  }
};



export const UpdateProfile = async (req, res) => {
  try {
    const email = req.admin.email;

    const userData = {
      ...req.body,
      admin_img: req.file ? `/uploads/admins/${req.file.filename}` : null,
    };

    await Profile.UpdateProfile(email, userData);

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const DeleteProfileImage = async (req, res) => {
  try {
     const email = req.admin.email;
    await Profile.deleteProfileImage(email, res);

  }catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};