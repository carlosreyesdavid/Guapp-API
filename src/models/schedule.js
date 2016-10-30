var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
var Hour = require('./hour'); 

var scheduleSchema = new Schema({
  day: String,
  hours: Hour.schema
});

module.exports = mongoose.model('Schedule',scheduleSchema);