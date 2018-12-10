const mongoose = require('mongoose');

const settingSchema = mongoose.Schema({
  type: { type: String, required: true },
  settings: Object
});

module.exports = mongoose.model('Setting', settingSchema);
