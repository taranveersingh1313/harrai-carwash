import db from "../../config/dbConnect.js";

const Profile = {
  GetProfile: async (email) => {
    try {
      const [rows] = await db.query(
        "SELECT * FROM admins WHERE email = ? LIMIT 1",
        [email]
      );

      return rows.length ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  },

  // UpdateProfile: async (email, userData = {}) => {

  //   if (!email) {
  //     throw new Error("Email is required");
  //   }

  //   const {
  //     admin_img = null,
  //     name,
  //     country_code,
  //     phone_number,
  //     password,
  //   } = userData;

  //   console.log("UserData :", userData);

  //   let query = `
  //   UPDATE admins SET admin_img = ?, name = ?, country_code = ?, phone_number = ?`;
  //   const params = [admin_img, name, country_code, phone_number];

  //   if (password) {
  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     query += `, password = ?`;
  //     params.push(hashedPassword);
  //   }

  //   query += ` WHERE email = ?`;
  //   params.push(email);

  //   const [result] = await db.query(query, params);
  //   return result;
  // },

  UpdateProfile: async (email, data) => {
    const { name, country_code, phone_number, password, admin_img } = data;

    let query = `
      UPDATE admins SET
        name = ?,
        country_code = ?,
        phone_number = ?
    `;
    const params = [name, country_code, phone_number];

    if (admin_img) {
      query += `, admin_img = ?`;
      params.push(admin_img);
    }

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      query += `, password = ?`;
      params.push(hashed);
    }

    query += ` WHERE email = ?`;
    params.push(email);

    const [result] = await db.query(query, params);
    return result;
  },


};


export default Profile;
