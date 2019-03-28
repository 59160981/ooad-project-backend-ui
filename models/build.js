const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Build = new Schema({
    buildID: {type: String},
    Room: [{type: String}],
    maxStudent: [{type: String}],
    type: [{type: String}],
    status: [{type: String}]}, 
  {
    collection: 'build'
  });

module.exports = mongoose.model('Build', Build);