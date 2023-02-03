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
    default: new Date("1900-01-01T00:00:00Z")
  },
  origin: {
    type: String,
    default: ""
  },
  residence: {
    type: String,
    default: ""
  },
  specialty: {
    type: String,
    default: "What do you do?"
  },
  about: {
    type: String,
    default: "Describe yourself..."
  },
  liked: {
    type: Array,
    default: []
  },
  disliked: {
    type: Array,
    default: []
  },
  bookmarked: {
    type: Array,
    default: []
  },


});

module.exports = User = mongoose.model("users", UserSchema);