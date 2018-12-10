const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  role: { type: String, default: 'user', required: true }
});

// validate user is unique, the flag above is for db optimizations, not validation
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
