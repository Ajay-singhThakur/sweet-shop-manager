const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const sweetRoutes = require('./routes/sweets'); // Add this

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweetshop')
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));
}

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes); // Add this
app.get('/api/health', (req, res) => res.status(200).json({ status: 'OK' }));

module.exports = app;