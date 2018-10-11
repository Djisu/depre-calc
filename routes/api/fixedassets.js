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
  console.log('I am in all fixedassets')
  const errors = {}

  Fixedassets.find()
    //.populate('user', 'fixedassets')
    .then(fixedassets => {
      if (!fixedassets) {
        console.log('In  if (!fixedassets) {')
        errors.nofixedassets = 'There are no fixedassets'
        res.status(404).json(errors)
      }
      console.log('In  I have got it')
      res.json(fixedassets)
      console.log('fixed assets returned')
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
  console.log('I am in post fixed assets')
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

  console.log('in fixed assets backend')

  if (req.body.assettype) fixedassetsFields.assettype = req.body.assettype
  if (req.body.assetdesc) fixedassetsFields.assetdesc = req.body.assetdesc
  if (req.body.assetcost) fixedassetsFields.assetcost = req.body.assetcost
  if (req.body.serialno) fixedassetsFields.serialno = req.body.serialno
  if (req.body.location) fixedassetsFields.location = req.body.location
  if (req.body.country) fixedassetsFields.country = req.body.country
  if (req.body.owner) fixedassetsFields.owner = req.body.owner
  if (req.body.gpsaddress) fixedassetsFields.gpsaddress = req.body.gpsaddress
  if (req.body.bank) fixedassetsFields.bank = req.body.bank
  if (req.body.cobegdate) fixedassetsFields.cobegdate = req.body.cobegdate
  if (req.body.coenddate) fixedassetsFields.coenddate = req.body.coenddate
  if (req.body.status) fixedassetsFields.status = req.body.status
  if (req.body.imageurl) fixedassetsFields.imageurl = req.body.imageurl

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
    // console.log('req.user.id: ' + req.user.id)
    // console.log('req.params.fix_id: ' + req.params.fix_id)

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



