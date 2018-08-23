const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateFixedassetsInput(data) {
  let errors = {}

  // Make sure field is not empty
  data.assettype = !isEmpty(data.assettype) ? data.assettype : ''
  data.assetdesc = !isEmpty(data.assetdesc) ? data.assetdesc : ''
  data.depretype = !isEmpty(data.depretype) ? data.depretype : ''
  data.deprerate = !isEmpty(data.deprerate) ? data.deprerate : ''
  data.residamount = !isEmpty(data.residamount) ? data.residamount :''
  data.usefulyears = !isEmpty(data.usefulyears) ? data.usefulyears : ''
  data.assetcost = !isEmpty(data.assetcost) ? data.assetcost : ''
  data.purchasedate = !isEmpty(data.purchasedate) ? data.purchasedate : ''
  data.serialno = !isEmpty(data.serialno) ? data.serialno : ''
  data.location = !isEmpty(data.location) ? data.location : ''
  data.department = !isEmpty(data.department) ? data.department : ''
  data.country = !isEmpty(data.country) ? data.country : ''
  // data.insureflag = !isEmpty(data.insureflag) ? data.insureflag : ''
  // data.imageurl = !isEmpty(data.imageurl) ? data.imageurl : ''
  // data.assetdebitcode = !isEmpty(data.assetdebitcode) ? data.assetdebitcode : ''
  // data.assetcreditcode = !isEmpty(data.assetcreditcode) ? data.assetcreditcode : ''
  // data.depreexpdebitcode = !isEmpty(data.depreexpdebitcode) ? data.depreexpdebitcode : ''
  //data.depreexpcreditcode = !isEmpty(data.depreexpcreditcode) ? data.depreexpcreditcode : ''
  //data.insurecost = !isEmpty(data.insurecost) ? data.assettype : 0

  // Send message for empty field
  if (Validator.isEmpty(data.assettype)) {
    errors.assettype = 'Asset type is required'
  }
  if (Validator.isEmpty(data.assetdesc)) {
    errors.assetdesc = 'Asset description is required'
  }
  if (Validator.isEmpty(data.depretype)) {
    errors.depretype = 'Asset depreciation type is required'
  }
  if (Validator.isEmpty(data.deprerate)) {
    errors.deprerate = 'Asset depreciation rate is required'
  }
  if (typeof data.deprerate == String) {
    errors.deprerate = 'Asset depreciation rate must be numeric'
  }

  if (Validator.isEmpty(data.residamount)) {
    errors.residamount = 'Residual amount is required'
  }
  if (typeof data.residamount == String) {
    errors.residamount = 'Residual amount must be numeric'
  }

  if (Validator.isEmpty(data.usefulyears)) {
    errors.usefulyears = 'Useful years is required'
  }
  if (typeof data.usefulyears == String) {
    errors.usefulyears = 'Useful years must be numeric'
  }

  if (Validator.isEmpty(data.assetcost)) {
    errors.assetcost = 'Asset initial cost is required'
  }
  if (typeof data.assetcost == String) {
    errors.assetcost = 'Asset cost must be numeric'
  }

  if (Validator.isEmpty(data.purchasedate)) {
    errors.purchasedate = 'Purchase date is required'
  }
  if (typeof data.purchasedate == Date) {
    errors.purchasedate = 'Purchase date must be date'
  }
  if (Validator.isEmpty(data.serialno)) {
    errors.serialno = 'Serial number is required'
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location is required'
  }
  if (Validator.isEmpty(data.department)) {
    errors.department = 'Department is required'
  }
  if (Validator.isEmpty(data.country)) {
    errors.country = 'country is required'
  }
  /* if (Validator.isEmpty(data.insureflag)) {
    errors.insureflag = 'Insureflag must either be yes or no'
  }
  if (Validator.isEmpty(data.insureflag)) {
    errors.insureflag = 'Insureflag must either be yes or no'
  } */

  // assetdebitcode
  // assetcreditcode
  // depreexpdebitcode
  // depreexpcreditcode
  // insurecost

  return {
    errors,
    isValid: isEmpty(errors)
  }
}