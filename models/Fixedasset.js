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
  depretype: {
    type: String,
    required: true
  },
  deprerate: {
    type: Number,
    required: true
  },
  residamount: {
    type: Number,
    required: true
  },
  usefulyears: {
    type: Number,
    required: true
  },
  assetcost: {
    type: Number,
    required: true
  },
  purchasedate: {
    type: Date,
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
  department: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  insureflag: {
    type: String
  },
  imageurl: {
    type: String
  },
  assetdebitcode: {
    type: String
  },
  assetcreditcode: {
    type: String
  },
  depreexpdebitcode: {
    type: String
  },
  depreexpcreditcode: {
    type: String
  },
  insurecost: {
    type: Number,
    required: true
  }
})

module.exports = Fixedasset = mongoose.model('fixedassets', FixedassetSchema)