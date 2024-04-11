const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const imageRoutes = require('./routes/imageRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const exportRoutes = require('./routes/exportRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://nishantmalik2015:qYRh1Om8mNf8G7ih@cluster0.0uzogt3.mongodb.net/Vision")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/images', imageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/export', exportRoutes);

app.get('*', (req, res) => {
  res.status(200).json({
    message: 'bad request',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
