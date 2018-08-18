const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema: define fields
const InsurerSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    telno: {
      type: String,
      required: true
    }
})

module.exports = Insurer = mongoose.model('insurers', InsurerSchema)
