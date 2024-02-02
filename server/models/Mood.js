// set up Mood model to store the User's mood
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const moodSchema = new Schema({
  moodText: {
    type: String,
  },
  thought: {
    type: String,
  },
  moodDate: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Mood = model('Mood', moodSchema);

module.exports = Mood;
