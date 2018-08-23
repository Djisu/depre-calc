const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateAssettypeInput(data) {
  let errors = {}

  // Make sure field is not empty: use our isEmpty() function
  data.assettype = !isEmpty(data.assettype) ? data.assettype : ''


  // Send message for empty field: use Validator.isEmpty() 
  if (Validator.isEmpty(data.assettype)) {
    errors.assettype = 'Asset type is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}