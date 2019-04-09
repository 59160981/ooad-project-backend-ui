const express = require('express');
const app = express();
const Router = express.Router();
const Term = require('../models/term');
const Subject = require('../models/subject');
userLoginDetails = ""

Router.route('/').get(function(req, res) {
    Subject.find(function(err, subject) {
        Term.findOne(function(err, term) {
            // console.log(subject)
            res.render('subject', { login: userLoginDetails, subject: subject, term: term });
        });
    });
});

Router.route('/create').get(function(req, res) {
    Term.findOne(function(err, term) {
        res.render('addSubject', { login: userLoginDetails, term: term, err: false });
    });
});

Router.route('/create').post(function(req, res) {
    const data = Subject(req.body)
    const subject_id = req.body.subject_id
    Subject.findOne({ subject_id: subject_id }, function(err, subject) {
        if (subject) {
            Term.findOne(function(err, term) {
                res.render('addSubject', { login: userLoginDetails, term: term, err: true });
            });
        } else {
            // console.log(data)
            data.save()
            res.redirect('/home/subject')
        }
    });
});

Router.route('/delete/:id').get(function(req, res) {
    Subject.findByIdAndRemove({ _id: req.params.id },
        function(err, coin) {
            if (err) res.json(err);
            else res.redirect('/home/subject');
        });
});

Router.route('/edit/:id').get(function(req, res) {
    Subject.findById({ _id: req.params.id }, function(err, subject) {
        Term.findOne(function(err, term) {
            res.render('editSubject', { login: userLoginDetails, subject: subject, term: term, err: false });
        });
    });
});

Router.route('/edit/:id').post(function(req, res) {
    Subject.findById(req.params.id, function(err, subject) {
        if (!subject)
            return next(new Error('Could not load Document'));
        else {
            // do your updates here
            subject.subject_id = req.body.subject_id;
            subject.subject_ThName = req.body.subject_ThName;
            subject.subject_EngName = req.body.subject_EngName;
            subject.subject_credit = req.body.subject_credit;
            subject.save()
            res.redirect('/home/subject');
        }
    });
});

module.exports = Router;