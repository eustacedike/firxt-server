const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  postbody: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authormail: {
    type: String,
    required: true
  },
  readtime: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0,
    // required: true
  },
  downvotes: {
    type: Number,
    default: 0,
    // required: true
  },
  image: {
    type: String,
  },
  replies: {
    type: Array,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  },

});

module.exports = Post = mongoose.model("posts", PostSchema);