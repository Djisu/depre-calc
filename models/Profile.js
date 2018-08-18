const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create our Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  location: {
      type: String,
      required: true
  },
  country: {
      type: String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)