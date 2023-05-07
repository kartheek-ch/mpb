const mongoose = require('mongoose');

const fivebyoneSchema = new mongoose.Schema({
  date: Date,
  intrest: String,
  annual: String,
});

module.exports = mongoose.model('Thirty', fivebyoneSchema);