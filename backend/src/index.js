const express = require('express');
const cors = require('cors');
const db = require('./config/dbConnect');
const app = express();
const authRoutes = require('./routes/admin/authRoutes');

app.use(cors());
app.use(express.json());




// ... other middleware
app.use('/api/auth', authRoutes);

// Example Route: Get all users
// app.get('/users', async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM users");
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.listen(5000, () => console.log('Server running on port 5000'));