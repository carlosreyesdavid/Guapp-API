var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var localSchema = new Schema({
  name: { type: String, required: true, unique: true },
  local_type: String,
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('Local', localSchema);  