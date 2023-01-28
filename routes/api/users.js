const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  
    const { errors, isValid } = validateRegisterInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    User.findOne({ email: req.body.Email }).then(user => {
      if (user) {
        return res.status(400).json({ Email: "Email already exists" });
      } else {
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.Email,
          password: req.body.Psw,
          link: req.body.link,
          gender: req.body.gender
        });
  
  
  
  
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });




  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);

  }

  const email = req.body.Email;
  const password = req.body.Psw;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      console.log("user not found");
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          email: user.email,
          name: user.firstname,
        };

        console.log(user.firstname);

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              userFirstName: user.firstname,
              userLastName: user.lastname,
              userEmail: user.email,
              userDP: user.profileimage,
             
              userJoinDate: user.date,
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});



router.get("/fetchusers", async (req, res) => {

  const theUsers = await User.find();

  res.send(
    theUsers
  );
});



router.post("/changedp", (req, res) => {

  
  User.findOne({email: req.body.email})
  .then(question =>{
    // console.log(question.question);

    User.findOneAndUpdate({email: req.body.email},{profileimage: req.body.image},{new: true},
    function(
      err,
      inventory
    ) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("success");
        res.send(inventory);
      }
    }
    );
  })


});


router.post("/changebrief", (req, res) => {

  User.findOneAndUpdate({email: req.body.email},{specialty: req.body.brief},{new: true},
    function(
      err,
      inventory
    ) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("success");
        res.send(inventory);
      }
    }
    );
});


router.post("/changedesc", (req, res) => {

  User.findOneAndUpdate({email: req.body.email},{about: req.body.desc},{new: true},
    function(
      err,
      inventory
    ) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("success");
        res.send(inventory);
      }
    }
    );
});

router.post("/changeorigin", (req, res) => {

  User.findOneAndUpdate({email: req.body.email},{origin: req.body.origin},{new: true},
    function(
      err,
      inventory
    ) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("success");
        res.send(inventory);
      }
    }
    );
});

router.post("/changeresidence", (req, res) => {

  User.findOneAndUpdate({email: req.body.email},{residence: req.body.residence},{new: true},
    function(
      err,
      inventory
    ) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("success");
        res.send(inventory);
      }
    }
    );
});

  module.exports = router;