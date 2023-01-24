const express = require("express");
const router = express.Router();
const passport = require("passport");


// Load Post model
const Post = require("../../models/Post");



router.post("/postblog", (req, res) => {

  const newPost = new Post({
    title: req.body.title,
    postbody: req.body.postbody,
    author: req.body.author,
    readtime: req.body.readtime,
    category: req.body.category,
    link: req.body.link,
    image: req.body.image
  });
 

  newPost
    .save()

    .then(res.send("posted!"))
    .catch(err => console.log(err));


});


router.post("/deletepost", (req, res) => {

  Post.deleteOne({ _id: req.body.id })


    .catch(err => console.log(err));


});







router.get("/fetchposts", async (req, res) => {

  const thePosts = await Post.find();

  res.send(
    thePosts
  );
});


// router.post("/uploadimage", async (req, res) => {


  
//   if (req.body.image === "") {
//     console.log('no image');
//   } else {
//       Post.updateOne({message: req.body.topic}, {$push: {"messageArray" : req.body.image}})
//       .then(res => console.log("sent"))
//           .catch(err => console.log(err));
      
//   }  
 

    
// });



router.post("/sendreply", (req, res) => {

  const replyObj = {
    reply: req.body.reply,
    replyauthor: req.body.replyauthor,
    replyauthoremail: req.body.replyauthoremail,
    replytime: req.body.replytime,
  }

  Post.updateOne({_id: req.body.id}, {$push: {"replies" : replyObj}})
.then(res => console.log("new reply"))
    .catch(err => console.log(err));


});

module.exports = router;