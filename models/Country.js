const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema: define fields
const CountrySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  country: {
    type: String,
    required: true
  }
})

module.exports = Country = mongoose.model('country', CountrySchema)
