const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create our Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  location: {
      type: String,
      required: true
  },
  country: {
      type: String,
      required: true
  },
  company: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  fixedassets: [
    {
      assettype: {
        type: String,
        required: true
      },
      assetdesc: {
        type: String,
        required: true
      },
      assetcost: {
        type: Number,
        required: true
      },
      serialno: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      owner: {
        type: String,
        required: true
      },
      gpsaddress: {
        type: String,
        required: true
      },
      bank: {
        type: String
      },
      cobegdate: {
        type: Date
      },
      coenddate: {
        type: Date
      },
      status: {
        type: String,
        required: true
      },
      imageurl: {
        type: String
      }
    }
  ]
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)