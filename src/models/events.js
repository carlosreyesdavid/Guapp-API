var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    log      = require('../logger/log'),
    config   = require('../config/config.json')[process.env.NODE_ENV || 'development']

var eventsSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    unique: true 
  },
  place: String,
  description: String,
  startDate: { 
    type: Date,
    required: true
  },
  endDate: { 
    type: Date,
    required: true
  },
  locals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Local'
  }],
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

log.info('Tiempo de vida de un evento: ' + config.EVENTS_EXPIRE)
eventsSchema.path('endDate').expires(config.EVENTS_EXPIRE);

module.exports = mongoose.model('Event', eventsSchema);  