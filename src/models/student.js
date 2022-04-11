const mongoose = require("mongoose");
const validator=require('validator')
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  enrollment_no: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  branch: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  contact_no: {
    type: Number,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  transaction_date: {
    type: String,
    required: true,
  },
  transaction_time: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("students", userSchema);

module.exports = Student;
