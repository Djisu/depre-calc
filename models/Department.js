const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create Schema: define fields
const DepartmentSchema = new Schema({
  dept_desc: {
    type: String,
    required: true,
  },
})

module.exports = Department = mongoose.model('departments', DepartmentSchema)
