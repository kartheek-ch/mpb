const mongoose = require('mongoose');

const thirtySchema = new mongoose.Schema({
  date: Date,
  intrest: String,
  annual: String,
});

module.exports = mongoose.model('Thirty', thirtySchema);