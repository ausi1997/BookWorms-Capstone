const mongoose = require("mongoose");
const { String } = mongoose.Schema.Types;
const profileSchema = new mongoose.Schema({
  // defining the user data model
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    ref: "user",
  },
  contactNumber: {
    type: String,
    ref: "user",
  },
  profilePhoto: {
    type: String,
  },
  userEducation: {
    type: String,
  },
  location: {
    State: {
      type: String,
    },
    City: {
      type: String,
    },
    Area: {
      type: String,
    },
  },
  timestamps: {
    type: Date,
    default: Date.now(),
  },
});

// creating profile model
mongoose.model("profile", profileSchema); // defines collection name where we will insert this all data

// exporting the model
module.exports = mongoose.model("profile");
