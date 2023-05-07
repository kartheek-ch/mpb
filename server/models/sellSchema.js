const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema({
  name: String,
  comment: String,
  dop: Date,
  est: String,
  fault: String,
});

module.exports = mongoose.model('Sell', sellSchema);