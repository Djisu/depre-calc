const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateFixedassetsInput(data) {
  let errors = {}

  // Make sure field is not empty
  data.assettype = !isEmpty(data.assettype) ? data.assettype : ''
  data.assetdesc = !isEmpty(data.assetdesc) ? data.assetdesc : ''
  data.assetcost = !isEmpty(data.assetcost) ? data.assetcost : ''
  data.serialno = !isEmpty(data.serialno) ? data.serialno : ''
  data.location = !isEmpty(data.location) ? data.location : ''
  data.country = !isEmpty(data.country) ? data.country : ''
  data.owner = !isEmpty(data.owner) ? data.owner : ''
  data.gpsaddress = !isEmpty(data.gpsaddress) ? data.gpsaddress : ''
  data.bank = !isEmpty(data.bank) ? data.bank : ''
  data.cobegdate = !isEmpty(data.cobegdate) ? data.cobegdate : ''
  data.coenddate = !isEmpty(data.coenddate) ? data.coenddate : ''
  data.status = !isEmpty(data.status) ? data.status : ''

  // Send message for empty field
  if (Validator.isEmpty(data.assettype)) {
    errors.assettype = 'Asset type is required'
  }
  if (Validator.isEmpty(data.assetdesc)) {
    errors.assetdesc = 'Asset description is required'
  }

  if (Validator.isEmpty(data.assetcost)) {
    errors.assetcost = 'Asset initial cost is required'
  }
  if (typeof data.assetcost == String) {
    errors.assetcost = 'Asset cost must be numeric'
  }
  if (Validator.isEmpty(data.serialno)) {
    errors.serialno = 'Serial number is required'
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location is required'
  }
  if (Validator.isEmpty(data.country)) {
    errors.country = 'country is required'
  }
  if (Validator.isEmpty(data.owner)) {
    errors.owner = 'Owner is required'
  }
  if (Validator.isEmpty(data.gpsaddress)) {
    errors.gpsaddress = 'GPS address is required'
  }
  if (Validator.isEmpty(data.bank)) {
    errors.bank = 'The name of bank is required'
  }

  if (Validator.isEmpty(data.cobegdate)) {
    errors.cobegdate = 'Colateral beginning date is required'
  }
  if (typeof data.cobegdate == Date) {
    errors.cobegdate = 'Colateral beginning date must be date'
  }
  if (Validator.isEmpty(data.coenddate)) {
    errors.coenddate = 'Colateral ending date is required'
  }
  if (typeof data.coenddate == Date) {
    errors.coenddate = 'Colateral ending date must be date'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}