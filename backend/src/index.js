const express = require('express');
const cors = require('cors');
const db = require('./config/dbConnect');
const app = express();
const authRoutes = require('./routes/admin/authRoutes');
const Routes = require('./routes/admin/Routes');

app.use(cors());
app.use(express.json());




// ... other middleware
app.use('/api/auth', authRoutes);
app.use('/api/admin', Routes);

app.listen(5000, () => console.log('Server running on port 5000'));