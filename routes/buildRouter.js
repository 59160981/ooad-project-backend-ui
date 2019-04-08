const express = require('express');
const app = express();
const Router = express.Router();
const Build = require('../models/build');
// userLoginDetails = ""
Router.route('/').get(function (req, res) {
    try {
        Build.find(function (err, build) {
            res.render('build', { login: userLoginDetails, build: build });
        });
    } catch (error) {
        res.redirect('/home')
    }

});

// var addRoom = 0;
Router.route('/create').get(function (req, res) {
    addRoom = 0;
    res.render('addBuild', { login: userLoginDetails, err: false, addRoom: addRoom });
});

// Router.route('/createAddMoreRoom').get(function (req, res) {
//     addRoom++;
//     res.render('addBuild', { login: userLoginDetails, err: false, addRoom: addRoom });
// });

// Router.route('/createAddMoreRoomx').get(function (req, res) {
//     if (addRoom > 0) {
//         addRoom--;
//         res.render('addBuild', { login: userLoginDetails, err: false, addRoom: addRoom });
//     }
// });

Router.route('/create').post(function (req, res) {
    const buildID = req.body.buildID;
    const DataUser = new Build(req.body);

    Build.findOne({ buildID: buildID }, function (err, buildInServer) {
        if (buildInServer) {
            Build.find(function (err, build) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('have user in server')
                    res.render('addBuild', { login: userLoginDetails, err: true });
                }
            });
        } else {
            console.log(DataUser)
            // console.log(buildID)
            DataUser.save()
            res.redirect('/home/build')
        }
    });
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
    Build.findById(id, function (err, build) {
        res.render('editBuild', { login: userLoginDetails, build: build });
    });
});
Router.route('/edit/:id').post(function (req, res) {
    Build.findById(req.params.id, function (err, build) {
        if (!build)
            return next(new Error('Could not load Document'));
        else {
            // do your updates here
            build.buildID = req.body.buildID;

            build.save().then(user => {
                res.redirect('/home/build');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});


module.exports = Router;