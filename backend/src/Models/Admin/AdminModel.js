const db = require('../../config/dbConnect');

const Admin = {
  getAllAdmins: async () => {
    const [rows] = await db.query("SELECT * FROM admins");
    return rows;
  },

  create: async (userData) => {
    const { name, email, username, password, country_code, phone_number } = userData;
    const [result] = await db.query(
      "INSERT INTO admins (name, email,username,password,country_code,phone_number) VALUES (?, ?,?,?,?,?)",
      [name, email, username, password, country_code, phone_number]
    );
    return result;
  }
};

module.exports = Admin;