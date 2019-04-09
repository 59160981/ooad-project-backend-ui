const express = require('express');
const app = express();
const Router = express.Router();
const Room = require('../models/room');
const Build = require('../models/build');
const Term = require('../models/term');
userLoginDetails = "";
Router.route('/').get(function(req, res) {
    Room.find(function(err, room) {
        Term.findOne(function(err, term) {
            res.render('room', { login: userLoginDetails, room: room, term: term });
        });
    });
});

var addRoom = 0;
Router.route('/create').get(function(req, res) {
    var dup = [];
    addRoom = 0;
    Build.find(function(err, build) {
        Term.findOne(function(err, term) {
            res.render('addRoom', { login: userLoginDetails, build: build, err: false, addRoom: addRoom, dup: dup, term: term });
        });
    });
});

Router.route('/createAddMoreRoom').get(function(req, res) {
    var dup = [];
    addRoom++;
    Build.find(function(err, build) {
        Term.findOne(function(err, term) {
            res.render('addRoom', { login: userLoginDetails, build: build, err: false, addRoom: addRoom, dup: dup, term: term });
        });
    });
});

Router.route('/createAddMoreRoomx').get(function(req, res) {
    var dup = [];
    if (addRoom > 0) {
        addRoom--;
        Build.find(function(err, build) {
            Term.findOne(function(err, term) {
                res.render('addRoom', { login: userLoginDetails, build: build, err: false, addRoom: addRoom, dup: dup, term: term });
            });
        });
    }
});

Router.route('/create').post(function(req, res) {
    var dup = [];
    var buildID = req.body.buildID;
    var roomIDAdd = req.body.roomID;
    var Data = Room(req.body)
    Room.findOne({ buildID: buildID }, function(err, room) {
        if (room) {
            if (addRoom == 0) {
                for (let i = 0; i < room.roomID.length; i++) {
                    if (roomIDAdd == room.roomID[i]) {
                        dup.push(roomIDAdd)
                    }
                }
                if (dup.length > 0) {
                    console.log(dup)
                    Build.find(function(err, build) {
                        Term.findOne(function(err, term) {
                            res.render('addRoom', { login: userLoginDetails, build: build, err: true, addRoom: addRoom, dup: dup, term: term });
                        });
                    });
                } else {
                    room.roomID.push(req.body.roomID);
                    room.type.push(req.body.type);
                    room.maxStudent.push(parseInt(req.body.maxStudent));
                    room.status.push(req.body.status);
                    room.save()
                    res.redirect('/home/room')
                }
            } else {
                for (let i = 0; i < roomIDAdd.length; i++) {
                    for (let j = 0; j < room.roomID.length; j++) {
                        if (roomIDAdd[i] == room.roomID[j]) {
                            dup.push(roomIDAdd[i])
                        }
                    }
                }
                if (dup.length > 0) {
                    console.log(dup)
                    Build.find(function(err, build) {
                        Term.findOne(function(err, term) {
                            res.render('addRoom', { login: userLoginDetails, build: build, err: true, addRoom: addRoom, dup: dup });
                        });
                    });
                } else {
                    for (let i = 0; i <= addRoom; i++) {
                        room.roomID.push(req.body.roomID[i]);
                        room.type.push(req.body.type[i]);
                        room.maxStudent.push(parseInt(req.body.maxStudent[i]));
                        room.status.push(req.body.status[i]);
                    }
                    room.save()
                    res.redirect('/home/room')
                }
            }
        } else {
            console.log(Data)
            Data.save()
            res.redirect('/home/room')
        }
    });
});

Router.route('/delete/:id/:roomID').get(function(req, res) {
    const id = req.params.id;
    const removeRoomID = req.params.roomID;
    // console.log(removeRoomID)
    Room.find({ _id: id, roomID: removeRoomID }, function(err, room) {

        var size = room[0].roomID.length;
        // console.log(size)
        if (size == 1) {
            Room.findByIdAndRemove({ _id: id },
                function(err, room) {
                    res.redirect('/home/room');
                });
        } else {
            for (let i = 0; i < size; i++) {
                if (room[0].roomID[i] == removeRoomID) {
                    room[0].roomID.splice(i, i);
                    room[0].type.splice(i, i);
                    room[0].maxStudent.splice(i, i);
                    room[0].status.splice(i, i);
                }
            }
            // console.log(room[0])
            room[0].save()
            res.redirect('/home/room');
        }

    });
});

Router.route('/edit/:id').get(function(req, res) {
    const id = req.params.id;

    Room.findById(id, function(err, room) {
        Term.findOne(function(err, term) {
            res.render('editRoom', { login: userLoginDetails, room: room, term: term });
        });
    });
});

Router.route('/edit/:id').post(function(req, res) {
    const id = req.params.id;
    Room.findById(id, function(err, room) {
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