const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const bookAdsSchema = new mongoose.Schema({
  // defining the BookAds data model
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  BookImages: {
    type: String,
  },
  Category: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  Condition: {
    type: String,
    required: true,
  },

  Location: {
    type: String,
    required: true,
  },

  PostedBy: {
    type: ObjectId,
    ref: "user",
  },
  timestamps: {
    type: Date,
    default: Date.now(),
  },

});

// creating BookAds model
mongoose.model("bookAds", bookAdsSchema); // defines collection name where we will insert this all data

// exporting the model
module.exports = mongoose.model("bookAds");
