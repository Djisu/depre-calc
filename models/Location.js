const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema: define fields
const LocationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  location: {
    type: String,
    required: true
  }
})

module.exports = Location = mongoose.model('locations', LocationSchema)