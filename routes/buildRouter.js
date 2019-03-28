const express = require('express');
const app = express();
const Router = express.Router();
const Build = require('../models/build');

Router.route('/').get(function (req, res) {
    Build.find(function (err, build) {
        res.render('build',{login : userLogin,build: build });
    });
});

var addRoom = 0 ;
Router.route('/create').get(function (req, res) {
    addRoom = 0;
    res.render('addBuild',{login : userLogin,err: false,addRoom : addRoom});
});

Router.route('/createAddMoreRoom').get(function (req, res) {
    addRoom++;
    res.render('addBuild',{login : userLogin,err: false,addRoom : addRoom});
});


Router.route('/create').post(function (req, res) {
    const DataUser = new Build(req.body);
    const buildID = req.body.buildID;
    console.log(DataUser)
    console.log(buildID)
    DataUser.save()
    res.redirect('/home/build')
});


module.exports = Router;