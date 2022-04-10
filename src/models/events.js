const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
    trim: true,
  },
  start_date: {
    type: String,
    required: true,
    trim: true,
  },
  end_date: {
    type: String,
    required: true,
    trim:true
  },
  description: {
    type: String,
    required: true,
    trim:true
  },
  event_type: {
    type: String,
    required: true,
    trim:true
  },
 
});

const Event = mongoose.model("events", userSchema);

module.exports = Event;
