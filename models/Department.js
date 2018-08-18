const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema: define fields
const DepartmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  department: {
    type: String,
    required: true
  }
})

module.exports = Department = mongoose.model('departments', DepartmentSchema)
