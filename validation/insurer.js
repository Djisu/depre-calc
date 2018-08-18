const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateInsurerInput(data) {
  let errors = {}

  //console.log('data.name is : ' + data.name)
  // Make sure field is not empty
  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.telno = !isEmpty(data.telno) ? data.telno : ''

  // Send message for empty field
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Insurer name is required'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Insurer email is required'
  }
  if (Validator.isEmpty(data.telno)) {
    errors.telno = 'Insurer telephone no is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}