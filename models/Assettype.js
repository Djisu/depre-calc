const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema: define fields
const AssettypeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  assettype: {
    type: String,
    required: true
  }
})

module.exports = Assettype = mongoose.model('assettypes', AssettypeSchema)
