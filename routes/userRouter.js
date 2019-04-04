const express = require('express');
const app = express();
const userRouter = express.Router();
const User = require('../models/user');
var userLogin = ""
userRouter.route('/').get(function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('users',{login : userLogin, err:false , users: users }); //render collection "users"
    }
  });
});

userRouter.route('/create').get(function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('addUsers',{login : userLogin, err:false}); //render collection "users"
    }
  });
});

userRouter.route('/create').post(function (req, res) {
  const DataUser = new User(req.body);
  const username = req.body.username;
  User.findOne({ username: username}, function(err, userInServer) {
  if (userInServer) {
    User.find(function (err, users) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('have user in server')
        res.render('addUsers',{login : userLogin, err:true }); //render collection "users"
      }
    });
  } else {
    console.log(DataUser);
    DataUser.save()
    res.redirect('/home/users');
  }
  });
});

userRouter.route('/edit/:id').get(function (req, res) {
  const id = req.params.id;
  User.findById(id, function (err, user) {
    res.render('edit', {login : userLogin, user: user });
  });
});

userRouter.route('/edit/:id').post(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!user)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      user.username = req.body.username;
      user.password = req.body.password;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.type = req.body.type;

      user.save().then(user => {
        res.redirect('/home/users');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

userRouter.route('/delete/:id').get(function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id},
    function (err, coin) {
      if (err) res.json(err);
      else res.redirect('/home/users');
    });
});

module.exports = userRouter;