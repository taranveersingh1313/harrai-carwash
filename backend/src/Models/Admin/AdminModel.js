import bcrypt from "bcryptjs";

import db from "../../config/dbConnect.js";


const Admin = {

  getAdminList: async (limit, offset) => {
    const [[{ total }]] = await db.query(
      "SELECT COUNT(*) AS total FROM admins"
    );

    const [admins] = await db.query(
      `SELECT id, name, email, phone_number, created_at
     FROM admins
     ORDER BY id DESC
     LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return { admins, total };
  },


  SaveAdmin: async (userData) => {
    const {
      name,
      email,
      username,
      password,
      country_code,
      phone_number,
      admin_type,
    } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO admins 
     (name, email, username, password, country_code, phone_number, type)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        username,
        hashedPassword,
        country_code,
        phone_number,
        admin_type,
      ]
    );

    return result;
  },

  EditAdmin: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM admins WHERE id = ? LIMIT 1",
      [id]
    );

    return rows.length ? rows[0] : null;
  },

  UpdateAdmin: async (id, userData) => {
    const {
      name,
      country_code,
      phone_number,
      admin_type,
      password,
    } = userData;

    let query = `UPDATE admins SET name = ?, country_code = ?, phone_number = ?, type = ?`;
    const params = [name, country_code, phone_number, admin_type];

    // 🔐 only update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += `, password = ?`;
      params.push(hashedPassword);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    const [result] = await db.query(query, params);
    return result;
  },

  DeleteAdmin: async (id) => {
    const [result] = await db.query(
      "DELETE FROM admins WHERE id = ? LIMIT 1",
      [id]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return {
      id,
    };
  },



};

export default Admin;