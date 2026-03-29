require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

/* ========================
   Middleware
======================== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================
   Database Connection
======================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

/* ========================
   Routes
======================== */
app.use('/api/auth', require('./routes/auth.router'));
app.use('/api/user', require('./routes/user.router'));
// app.use('/api/istichara', require('./routes/istichara.router'));
app.use('/api/coupon', require('./routes/coupon.router'));
// app.use('/api/review', require('./routes/review.router'));

/* ========================
   Test Route
======================== */
app.get('/', (req, res) => {
  res.send('API is running...');
});

/* ========================
   Start Server
======================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running :http://localhost:${PORT}/`);
});