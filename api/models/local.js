var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var localSchema = new Schema({
  name: { type: String, required: true, unique: true },
  local_type: String,
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Local', localSchema);  