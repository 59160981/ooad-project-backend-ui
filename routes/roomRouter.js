const express = require('express');
const app = express();
const Router = express.Router();
const Room = require('../models/room');
const Build = require('../models/build');
var userLogin = ""
Router.route('/').get(function (req, res) {
    Room.find(function (err, room) {
        res.render('room', { login: userLogin, room: room });
    });
});

var addRoom = 0;
Router.route('/create').get(function (req, res) {
    addRoom = 0;
    Build.find(function (err, build) {
        res.render('addRoom', { login: userLogin, build: build, err: false, addRoom: addRoom });
    });
});

Router.route('/createAddMoreRoom').get(function (req, res) {
    addRoom++;
    Build.find(function (err, build) {
        res.render('addRoom', { login: userLogin, build: build, err: false, addRoom: addRoom });
    });
});

Router.route('/createAddMoreRoomx').get(function (req, res) {
    if (addRoom > 0) {
        addRoom--;
        Build.find(function (err, build) {
            res.render('addRoom', { login: userLogin, build: build, err: false, addRoom: addRoom });
        });
    }
});

Router.route('/create').post(function (req, res) {
    const DataUser = new Room(req.body);
    console.log(DataUser)
    // console.log(buildID)
    DataUser.save()
    res.redirect('/home/room')

});

Router.route('/delete/:id').get(function (req, res) {
    Build.findByIdAndRemove({ _id: req.params.id },
        function (err, coin) {
            if (err) res.json(err);
            else res.redirect('/home/build');
        });
});

Router.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    console.log(id)
    Room.findById(id, function (err, room) {
        console.log(room)
        res.render('editRoom', { login: userLogin, room: room });
    });
});

Router.route('/edit/:id').post(function (req, res) {
    const id = req.params.id;
    Room.findById(id, function (err, room) {
        room.buildID = req.body.buildID;
        room.roomID = req.body.roomID;
        room.type = req.body.type;
        room.maxStudent = req.body.maxStudent;
        room.status = req.body.status;
        // console.log(room)
        room.save()
        res.redirect('/home/room');
    });
});
module.exports = Router;