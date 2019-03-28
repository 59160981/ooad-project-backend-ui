const express = require('express');
const app = express();
const userRouter = express.Router();
const User = require('../models/user');


userRouter.route('/').get(function (req, res) {
  res.render('login',{err:false});
});

userRouter.route("/login").post(function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  
  User.findOne({ username: username, password: password }, function(err, user) {
    if (err) {
      res.status(400).send("No have user");
      res.render("login",{err:true});
    } else {
      if (user) {
        userLogin = user.firstName + "  " + user.lastName
        res.redirect('/home/users');
      } else {
        res.render("login",{err:true});
      }
    }
  });
});


module.exports = userRouter;