const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema: define fields
const LocationSchema = new Schema({
  location_desc: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('location', LocationSchema)
