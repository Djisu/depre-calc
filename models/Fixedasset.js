const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema: define fields
const FixedassetSchema = new Schema({
  asset_desc: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  custodian: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  general_ledger_class: {
    type: String,
    required: true,
  },
  aquis_date: {
    type: Date,
    required: true,
  },
  asset_cost: {
    type: Number,
    required: true,
  },
  depre_method: {
    type: String,
    required: true,
  },
  depre_rate: {
    type: Number,
    required: true,
  },
  salvage_value: {
    type: Number,
    required: true,
  },
  useful_years: {
    type: Number,
    required: true,
  },
  accum_depre: {
    type: Number,
    required: true,
  },
  vendor_name: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
  },
  asset_status: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Fixedasset = mongoose.model('fixedassets', FixedassetSchema)
