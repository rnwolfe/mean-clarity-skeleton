const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const common = require('./common');

// Routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const settingRoutes = require('./routes/setting');
const app = express();
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PW = process.env.MONGODB_PW;
const MONGODB_DB = process.env.MONGODB_DB;

// Connect to DB
mongoose.connect('mongodb+srv://' + MONGODB_USER + ':' + MONGODB_PW + '@cluster0-5kqfi.mongodb.net/' + MONGODB_DB + '?retryWrites=true')
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Database connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,  Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Set routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/setting', settingRoutes);
module.exports = app;
