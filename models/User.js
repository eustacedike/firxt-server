const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  dob: {
    type: Date,
    // required: true
  },
  upvotesgiven: {
    type: Number,
  },
  upvotesreceived: {
    type: Number,
  },
  downvotesgiven: {
    type: Number,
  },
  downvotesreceived: {
    type: Number,
  },


});

module.exports = User = mongoose.model("users", UserSchema);