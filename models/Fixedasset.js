const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema: define fields
const FixedassetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
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
    type: String,
    required: true
  },
  cobegdate: {
    type: Date,
    required: true
  },
  coenddate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

module.exports = Fixedasset = mongoose.model('fixedassets', FixedassetSchema)