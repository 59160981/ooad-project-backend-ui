const express = require('express');
const app = express();
const Router = express.Router();
const Term = require('../models/term');
userLoginDetails = ""
Router.route('/').get(function(req, res) {
    Term.findOne(function(err, term) {
        res.render('term', { login: userLoginDetails, term: term });
    });
});

Router.route('/').post(function(req, res) {
    Term.findOne(function(err, term) {
        term.year = req.body.year
        term.term = req.body.term
        term.save()
        res.render('term', { login: userLoginDetails, term: term });
    });
});
module.exports = Router;