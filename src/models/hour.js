var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var hourSchema = new Schema({
  schedule_start : String,
  schedule_end: String 
});

module.exports = mongoose.model('Hour',hourSchema);