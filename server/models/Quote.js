// set up Mood model to store the User's mood
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const moodSchema = new Schema({
  moodText: {
    type: String,
  },
});

const Mood = model('Mood', moodSchema);

module.exports = Mood;
