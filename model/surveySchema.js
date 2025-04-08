const mongoose = require("mongoose");

const surveySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter an Email"],
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
