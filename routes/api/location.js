const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateLocationInput = require('../../validation/location')
const Location = require('../../models/Location')
const User = require('../../models/User')

// @route Get api/location/test
// Desc Test for location routes
// Access Public
router.get('/test', (req, res) => res.json({
  msg: 'Location works'
}))

//*************** Location Modules ******************************************
// @route Get api/location/all
// Desc Get all locations
// Access Public
router.get('/all', (req, res) => {
  console.log('I am in all')
  const errors = {}

  Location.find()
    //.populate('user', 'location')
    .then(locations => {
      if (!locations) {
        errors.nolocation = 'There are no locations'
        res.status(404).json(errors)
      }
      res.json(locations)
    })
    .catch(err => res.status(404).json({
      msg: 'There are no locations'
    }))
})


// @route POST api/location
// Desc Add location to profile
// Access Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateLocationInput(req.body)

  // Check validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const locationFields = {}
  locationFields.user = req.user.id
  if (req.body.location) locationFields.location = req.body.location

  // const newLocation = { location: req.body.location }

  new Location(locationFields)
    .save()
    .then(location => res.json(location))
    .catch(err => console.log(err))
})

// @route DELETE api/location/:loc_id
// Desc Delete insurer from profile
// Access Private
router.delete('/:loc_id',
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    console.log('req.user.id: ' + req.user.id)
    console.log('req.params.loc_id: ' + req.params.loc_id)

    Location.findOne({
        user: req.user.id
      })
      .then(location => {
        Location.findById(req.params.loc_id)
          .then(location => {
            // check for post owner
            if (location.user.toString() !== req.user.id) {
              return res.status(401).json({
                notauthorised: 'User not authorised'
              })
            }

            // Delete
            location.remove().then(() => res.json({
              success: true
            }))
          })
          .catch(err => res.status(404).json({
            postnotfound: 'No post found'
          }))
      })
  })
// ************************End of Location**************************

module.exports = router