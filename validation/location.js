const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLocationInput(data) {
  let errors = {}

  // Make sure field is not empty
  data.location = !isEmpty(data.location) ? data.location : ''

  // Send message for empty field
  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}