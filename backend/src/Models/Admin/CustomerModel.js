import bcrypt from "bcryptjs";

import db from "../../config/dbConnect.js";


const Customer = {

    getList: async (limit, offset, search = "") => {
        // 1. Prepare the search term for SQL (e.g., "John" becomes "%John%")
        const searchTerm = `%${search}%`;

        // 2. Count total admins that match the search criteria
        const [[{ total }]] = await db.query(
            `SELECT COUNT(*) AS total FROM customers 
             WHERE name LIKE ? OR email LIKE ? OR phone_no LIKE ?`,
            [searchTerm, searchTerm, searchTerm]
        );

        // 3. Fetch the specific page of admins that match the search criteria
        const [customers] = await db.query(
            `SELECT *
                    FROM customers
                    WHERE name LIKE ? OR email LIKE ? OR phone_no LIKE ?
                    ORDER BY id DESC
                    LIMIT ? OFFSET ?`,
            [searchTerm, searchTerm, searchTerm, limit, offset]
        );

        return { customers, total };
    },


    SaveCustomer: async (userData, created_by) => {
        const {
            name,
            email,
            password,
            country_code,
            phone_no,
            is_verified,
            address,
            city,
            state,
            country,
            status,
            zip_code,
        } = userData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            `INSERT INTO customers 
     (name, email, password, country_code, phone_no, is_verified, address, city, state, country, status,zip_code, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                email,
                hashedPassword,
                country_code,
                phone_no,
                is_verified,
                address,
                city,
                state,
                country,
                status,
                zip_code,
                created_by,
            ]
        );

        return result;
    },

    EditCustomer: async (id) => {
        const [rows] = await db.query(
            "SELECT * FROM customers WHERE id = ? LIMIT 1",
            [id]
        );

        return rows.length ? rows[0] : null;
    },

    UpdateCustomer: async (id, customerData) => {
        const {
            name,
            country_code,
            phone_no,
             password,
            address,
            city,
            state,
            country,
            status,
             zip_code,
        } = customerData;

        let query = `UPDATE customers SET name = ?, country_code = ?, phone_no = ?, address = ?, city = ?, state = ?, country = ?, zip_code = ?, updated_at = NOW()`;
        const params = [name, country_code, phone_no, address, city, state, country, zip_code];

        // 🔐 only update password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += `, password = ?`;
            params.push(hashedPassword);
        }

        if (status) {
            query += `, status = ?`;
            params.push(status);

        }

        query += ` WHERE id = ?`;
        params.push(id);

        const [result] = await db.query(query, params);
        return result;
    },

    DeleteCustomer: async (id) => {
        const [result] = await db.query(
            "DELETE FROM customers WHERE id = ? LIMIT 1",
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

export default Customer;