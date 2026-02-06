
import db from "../../config/dbConnect.js";

const AdminLogin = {
  // Pass email and username as arguments to the function
  findByEmailOrUsername: async (email, username) => {
    try {
      const [rows] = await db.query(
        "SELECT * FROM admins WHERE email = ? OR username = ? LIMIT 1", 
        [email, username]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  },
};

export default AdminLogin;