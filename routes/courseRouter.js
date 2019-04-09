const express = require('express');
const app = express();
const Router = express.Router();
const Term = require('../models/term');
const Course = require('../models/course');
const Subject = require('../models/subject');
userLoginDetails = ""

Router.route('/').get(function(req, res) {
    Term.findOne(function(err, term) {
        // console.log(term)
        Course.find({ term: term.term, year: term.year }, function(err, course) {
            // console.log(course[0].subject_id)
            res.render('course', { login: userLoginDetails, term: term, course: course, err: false });
        });
    });
});

Router.route('/').post(function(req, res) {
    const subject_id = req.body.subject_idAdd
    const numGroup = parseInt(req.body.numberGroup)
    Term.findOne(function(err, term) {
        Subject.findOne({ subject_id: subject_id }, function(err, subject) {
            if (subject) {
                for (let i = 0; i < numGroup; i++) {
                    var Data = new Course({
                        year: term.year,
                        term: term.term,
                        group: i + 1,
                        subject_id: subject.subject_id,
                        subject_EngName: subject.subject_EngName,
                        subject_ThName: subject.subject_ThName,
                        subject_credit: subject.subject_credit,
                        subject_teacher: "",
                        subject_student: ""
                    });
                    console.log(Data);
                    Data.save();
                }
                Course.find({ term: term.term, year: term.year }, function(err, course) {
                    res.render('course', { login: userLoginDetails, term: term, course: course, err: false });
                });
            } else {
                Course.find({ term: term.term, year: term.year }, function(err, course) {
                    res.render('course', { login: userLoginDetails, term: term, course: course, err: true });
                });
            }
        });
    });
});

Router.route('/delete/:id').get(function(req, res) {
    Course.findByIdAndRemove({ _id: req.params.id },
        function(err, coin) {
            if (err) res.json(err);
            else res.redirect('/home/course');
        });
});
module.exports = Router;