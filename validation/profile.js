const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
  let errors = {}

  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.location = !isEmpty(data.location) ? data.location : ''
  data.country = !isEmpty(data.country) ? data.country : ''

  // Handle
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 40 characters'
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required'
  }


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