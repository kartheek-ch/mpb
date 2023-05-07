const mongoose = require('mongoose');

const pawnbrokerSchema = new mongoose.Schema({
  fullname: String,
  dob: String,
  phnumber: String,
  city: String,
  email: String,
});

module.exports = mongoose.model('Pawnbroker', pawnbrokerSchema);
