const mongoose = require('mongoose');

// define Schema
var SessionSchema = mongoose.Schema({
  name: String,
  voter_number: Number,
  story_list: Array,
  session: Array,
  final_story: Array
});

// compile schema to model
var Session = mongoose.model('Session', SessionSchema, 'scrum-poker');

module.exports = Session;