const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    year: { type: String },
    term: { type: String },
    group: { type: String },
    subject_id: { type: String },
    subject_EngName: { type: String },
    subject_ThName: { type: String },
    subject_credit: { type: String },
    subject_teacher: { type: String },
    subject_student: { type: String }
}, {
    collection: 'course'
});

module.exports = mongoose.model('Course', Course);