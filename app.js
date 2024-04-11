const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const config = require('./config');
const imageRoutes = require('./routes/imageRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const exportRoutes = require('./routes/exportRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cors());

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
