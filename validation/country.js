const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateCountryInput (data) {
  let errors = {}

  // Make sure field is not empty
  data.country = !isEmpty(data.country) ? data.country : ''

  // Send message for empty field
  if (Validator.isEmpty(data.country)) {
    errors.country = 'Country is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
