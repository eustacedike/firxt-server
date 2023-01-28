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
  gender: {
    type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  profileimage: {
    type: String,
    default: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
  },
  dob: {
    type: Date,
    // required: true
  },
  origin: {
    type: String,
    // required: true
  },
  residence: {
    type: String,
    // required: true
  },
  specialty: {
    type: String,
    // required: true
  },
  about: {
    type: String,
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