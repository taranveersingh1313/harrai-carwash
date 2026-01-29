const db = require('../../config/dbConnect');

const Admin = {
  // Pass email and username as arguments to the function
  findByEmailOrUsername: async (email, username) => {
    try {
      const [rows] = await db.query(
        "SELECT * FROM admins WHERE email = ? OR username = ? LIMIT 1", 
        [email, username]
      );



      // console.log(rows);
      
      // Return the first record found, or null if no record exists
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Admin;