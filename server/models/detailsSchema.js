const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  mstatus: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phnumber: {
    type: String,
    required: true,
  },
  aadhar: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  yoe: {
    type: Number,
    required: true,
  },
  gmi: {
    type: Number,
    required: true,
  },
  bname: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  sname: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Details', detailsSchema);
