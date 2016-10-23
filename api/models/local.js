var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
var Schedule = require('./schedule')

var localSchema = new Schema({
  name: { type: String, required: true, unique: true },
  local_type: String,
  address: String,
  phone: String,
  web: String,
  descripcion: String,
  schedules: [Schedule.schema],
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Local', localSchema);  