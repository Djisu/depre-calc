const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
  let errors = {}

  data.location = !isEmpty(data.location) ? data.location : ''
  data.country = !isEmpty(data.country) ? data.country : ''

  // Location
  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location field is required'
  }

  // country
  if (Validator.isEmpty(data.country)) {
    errors.country = 'Country field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}