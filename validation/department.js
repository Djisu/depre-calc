const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateDepartmentInput (data) {
  let errors = {}

  // Make sure field is not empty
  data.department = !isEmpty(data.department) ? data.department : ''

  // Send message for empty field
  if (Validator.isEmpty(data.department)) {
    errors.department = 'Department department is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
