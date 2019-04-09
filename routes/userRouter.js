const express = require('express');
const app = express();
const userRouter = express.Router();
const User = require('../models/user');
const Term = require('../models/term');
userLoginDetails = ""

userRouter.route('/').get(function(req, res) {
    User.find(function(err, users) {
        Term.findOne(function(err, term) {
            res.render('users', { login: userLoginDetails, users: users, term: term });
        });
    });
});

userRouter.route('/create').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            Term.findOne(function(err, term) {
                res.render('addUsers', { login: userLoginDetails, err: false, term: term });
            });
        }
    });
});

userRouter.route('/create').post(function(req, res) {
    const DataUser = new User(req.body);
    const username = req.body.username;
    User.findOne({ username: username }, function(err, userInServer) {
        if (userInServer) {
            User.find(function(err, users) {
                if (err) {
                    console.log(err);
                } else {
                    Term.findOne(function(err, term) {
                        res.render('addUsers', { login: userLoginDetails, err: true, term: term });
                    });
                }
            });
        } else {
            console.log(DataUser);
            DataUser.save()
            res.redirect('/home/users');
        }
    });
});

userRouter.route('/edit/:id').get(function(req, res) {
    const id = req.params.id;
    User.findById(id, function(err, user) {
        Term.findOne(function(err, term) {
            res.render('edit', { login: userLoginDetails, user: user, term: term });
        });
    });
});

userRouter.route('/edit/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
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

userRouter.route('/delete/:id').get(function(req, res) {
    User.findByIdAndRemove({ _id: req.params.id },
        function(err, coin) {
            if (err) res.json(err);
            else res.redirect('/home/users');
        });
});

module.exports = userRouter;