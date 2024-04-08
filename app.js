const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const imageRoutes = require('./routes/imageRoutes');
// const authRoutes = require('./routes/authRoutes');
// const adminRoutes = require('./routes/adminRoutes');
const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/images', imageRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
