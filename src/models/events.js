var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
  title: { type: String, required: true, unique: true },
  place: String,
  description: String,
  startDate: String,
  endDate: String,
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventsSchema);  