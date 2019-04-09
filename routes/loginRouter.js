const express = require('express');
const app = express();
const userRouter = express.Router();
const User = require('../models/user');
const Term = require('../models/term');
userLoginDetails = ""
userRouter.route('/').get(function(req, res) {
    res.render('login', { err: false });
});

userRouter.route("/login").post(function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username, password: password }, function(err, user) {
        if (err) {
            res.status(400).send("No have user");
            res.render("login", { err: true });
        } else {
            if (user) {
                userLogin = username
                res.redirect('/home/index')
            } else {
                res.render("login", { err: true });
            }
        }
    });
});

userRouter.route('/index').get(function(req, res) {
    try {
        User.findOne({ username: userLogin }, function(err, users) {
            if (err) {
                console.log(err);
            } else {
                userLoginDetails = users.firstName + " " + users.lastName
                Term.findOne(function(err, term) {
                    res.render('index', { login: userLoginDetails, users: users, term: term });
                });
            }
        });
    } catch (error) {
        res.redirect('/home')
    }

});
module.exports = userRouter;