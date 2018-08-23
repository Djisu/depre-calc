const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateFixedassetsInput = require('../../validation/fixedassets')
const Fixedassets = require('../../models/Fixedasset')
const User = require('../../models/User')

// @route Get api/location/test
// Desc Test for location routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'fixedassets works'
}))

//*************** Fixedassets Modules ******************************************
// @route Get api/fixedassets/all
// Desc Get all fixedassets
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all')
  const errors = {}

  Fixedassets.find()
    //.populate('user', 'fixedassets')
    .then(fixedassets => {
      if (!fixedassets) {
        errors.nofixedassets = 'There are no fixedassets'
        res.status(404).json(errors)
      }
      res.json(fixedassets)
    })
    .catch(err => res.status(404).json({
      msg: 'There are no fixedassets'
    }))
})


// @route POST api/fixedassets
// Desc Add fixedassets to profile
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateFixedassetsInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const fixedassetsFields = {}
  fixedassetsFields.user = req.user.id
  if (req.body.assettype) fixedassetsFields.assettype = req.body.assettype
  if (req.body.assetdesc) fixedassetsFields.assetdesc = req.body.assetdesc
  if (req.body.depretype) fixedassetsFields.depretype = req.body.depretype
  if (req.body.deprerate) fixedassetsFields.deprerate = req.body.deprerate
  if (req.body.residamount) fixedassetsFields.residamount = req.body.residamount
  if (req.body.usefulyears) fixedassetsFields.usefulyears = req.body.usefulyears
  if (req.body.assetcost) fixedassetsFields.assetcost = req.body.assetcost
  if (req.body.purchasedate) fixedassetsFields.purchasedate = req.body.purchasedate
  if (req.body.serialno) fixedassetsFields.serialno = req.body.serialno
  if (req.body.location) fixedassetsFields.location = req.body.location
  if (req.body.department) fixedassetsFields.department = req.body.department
  if (req.body.country) fixedassetsFields.country = req.body.country
  if (req.body.insureflag) fixedassetsFields.insureflag = req.body.insureflag
  if (req.body.imageurl) fixedassetsFields.imageurl = req.body.imageurl
  if (req.body.assetdebitcode) fixedassetsFields.assetdebitcode = req.body.assetdebitcode
  if (req.body.assetcreditcode) fixedassetsFields.assetcreditcode = req.body.assetcreditcode
  if (req.body.depreexpdebitcode) fixedassetsFields.depreexpdebitcode = req.body.depreexpdebitcode
  if (req.body.depreexpcreditcode) fixedassetsFields.depreexpcreditcode = req.body.depreexpcreditcode
  if (req.body.insurecost) fixedassetsFields.insurecost = req.body.insurecost


  new Fixedassets(fixedassetsFields)
    .save()
    .then(fixedassets => res.json(fixedassets))
    .catch(err => console.log(err))
  
})

// @route DELETE api/fixedassets/:fix_id
// Desc Delete fixedassets from profile
// Access Private
router.delete('/:fix_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    console.log('req.user.id: ' + req.user.id)
    console.log('req.params.fix_id: ' + req.params.fix_id)

    Fixedassets.findOne({
        user: req.user.id
      })
      .then(fixedassets => {
        Fixedassets.findById(req.params.fix_id)
          .then(fixedassets => {
            // check for post owner
            if (fixedassets.user.toString() !== req.user.id) {
              return res.status(401).json({
                notauthorised: 'User not authorised'
              })
            }

            // Delete
            fixedassets.remove().then(() => res.json({
              success: true
            }))
          })
          .catch(err => res.status(404).json({
            fixedassetsnotfound: 'No fixedassets found'
          }))
      })
  })


// ************************End of Location**************************

module.exports = router



