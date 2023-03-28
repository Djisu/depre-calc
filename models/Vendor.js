const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema: define fields
const VendorSchema = new Schema({
  vendor_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telno: {
    type: String,
    required: true,
  },
})

module.exports = Vendor = mongoose.model('vendor', VendorSchema)
