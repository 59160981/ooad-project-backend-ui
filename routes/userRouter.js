const express = require('express');
const app = express();
const userRouter = express.Router();
const User = require('../models/user');
var userLogin = "";

userRouter.route('/users').get(function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('users',{login : userLogin, err:false , users: users }); //render collection "users"
    }
  });
});

userRouter.route('/users').post(function (req, res) {
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
        res.render('users',{login : userLogin, err:true , users: users }); //render collection "users"
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

userRouter.route('/update/:id').post(function (req, res) {
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
        userLogin = username
        res.redirect('/home/users');
      } else {
        res.render("login",{err:true});
      }
    }
  });
});


module.exports = userRouter;