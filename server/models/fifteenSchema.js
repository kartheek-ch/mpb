const mongoose = require('mongoose');

const fifteenSchema = new mongoose.Schema({
  date: Date,
  intrest: String,
  annual: String,
});

module.exports = mongoose.model('Fifteen', fifteenSchema);