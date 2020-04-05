var mongoose = require("mongoose");

var personaldetailsSchema = new mongoose.Schema({
  religion: [{
    type: String,
    trim: true,
  }],
  education: [{
    type: String,
    trim: true,
  }],
  height: {
    type: String,
    trim: true,
  },
  weight: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  isDoingJob: [{
    type: Boolean,
  }],
});

var details = mongoose.model("personaldetails", personaldetailsSchema);
module.exports = details;